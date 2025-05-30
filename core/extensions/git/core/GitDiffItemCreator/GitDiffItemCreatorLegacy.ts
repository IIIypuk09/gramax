import type { ReadonlyCatalog } from "@core/FileStructue/Catalog/ReadonlyCatalog";
import { Item } from "@core/FileStructue/Item/Item";
import type { DiffItem, DiffItemResourceCollection, DiffResource } from "@ext/VersionControl/model/Diff";
import Path from "../../../../logic/FileProvider/Path/Path";
import FileProvider from "../../../../logic/FileProvider/model/FileProvider";
import FileStructure from "../../../../logic/FileStructue/FileStructure";
import ItemExtensions from "../../../../logic/FileStructue/Item/ItemExtensions";
import ResourceExtensions from "../../../../logic/Resource/ResourceExtensions";
import SitePresenter from "../../../../logic/SitePresenter/SitePresenter";
import { getDiff, getMatchingPercent } from "../../../VersionControl/DiffHandler/DiffHandler";
import { DiffHunk } from "../../../VersionControl/DiffHandler/model/DiffHunk";
import { FileStatus } from "../../../Watchers/model/FileStatus";
import GitVersionControl from "../GitVersionControl/GitVersionControl";
import { GitStatus } from "../GitWatcher/model/GitStatus";

export default class GitDiffItemCreatorLegacy {
	private _gitVersionControl: GitVersionControl;
	private _fp: FileProvider;

	constructor(private _catalog: ReadonlyCatalog, private _sp: SitePresenter, private _fs: FileStructure) {
		this._fp = _fs.fp;
	}

	public async getDiffItems(): Promise<DiffItemResourceCollection> {
		this._gitVersionControl = this._catalog.repo.gvc;
		if (!this._gitVersionControl) return { items: [], resources: [] };
		const changeFiles = await this._getChangeFiles();
		const { items, resources } = await this._getDiffItems(changeFiles.items, changeFiles.resources);

		const renamedDiffItems = this._findRenames(items);
		if (resources.length === 0) return { items: renamedDiffItems, resources: [] };

		const changeResources = await this._addDiffResources(resources, renamedDiffItems);
		const diffResources = await Promise.all(changeResources.map((c) => this._getDiffResource(c)));

		return { items: renamedDiffItems, resources: diffResources };
	}

	private async _getOldContent(path: Path, isNew = false): Promise<string> {
		if (isNew) return "";
		try {
			return await this._gitVersionControl.showLastCommitContent(path);
		} catch {
			return "";
		}
	}

	private async _getNewContent(path: Path, isDelete = false): Promise<string> {
		if (isDelete) return "";
		const filePath = this._catalog.getItemRefPath(path);
		const content = (await this._fp.exists(filePath)) && (await this._fp.read(filePath));
		return content ?? "";
	}

	private async _getDiffByPath(path: Path, isNew = false, isDelete = false): Promise<DiffHunk[]> {
		const oldContent = await this._getOldContent(path, isNew);
		const newContent = await this._getNewContent(path, isDelete);
		return getDiff(oldContent, newContent).changes;
	}

	private _findRenames(items: DiffItem[]): DiffItem[] {
		function replaceToRenamedDiffItem(
			diffItems: DiffItem[],
			removedFile: DiffItem,
			addedFile: DiffItem,
		): DiffItem[] {
			let addedIdx = 0;
			let removedIdx = 0;
			diffItems.forEach((diffItem, idx) => {
				if (!diffItem) return;
				if (diffItem.filePath.path === addedFile.filePath.path) addedIdx = idx;
				if (diffItem.filePath.path === removedFile.filePath.path) removedIdx = idx;
			});
			const addedDiffItem = diffItems[addedIdx];
			addedDiffItem.status = FileStatus.modified;
			addedDiffItem.hunks = getDiff(removedFile.content, addedFile.content).changes;
			addedDiffItem.filePath.hunks = getDiff(removedFile.filePath.path, addedDiffItem.filePath.path).changes;
			addedDiffItem.filePath.oldPath = removedFile.filePath.path;
			diffItems[addedIdx] = addedDiffItem;
			diffItems[removedIdx] = null;
			return diffItems;
		}

		const THRESHOLD = 50;
		let arrayWithRenames = [...items];
		const removedFiles = items.filter((item) => item.status === FileStatus.delete && item.content);
		const addedFiles = items.filter((item) => item.status === FileStatus.new && item.content);
		if (removedFiles.length === 0 || addedFiles.length === 0) return items;

		removedFiles.forEach((removedFile) => {
			let matching: { file: DiffItem; percent: number } = { file: null, percent: 0 };
			addedFiles.forEach((addedFile) => {
				const percent = getMatchingPercent(removedFile.content, addedFile.content);
				if (percent < THRESHOLD || percent <= matching.percent) return;
				matching = { file: addedFile, percent };
			});
			if (!matching.file) return;
			arrayWithRenames = replaceToRenamedDiffItem(arrayWithRenames, removedFile, matching.file);
		});

		return arrayWithRenames.filter((x) => x);
	}

	private async _getChangeFiles(): Promise<{
		items: GitStatus[];
		resources: GitStatus[];
	}> {
		const items: GitStatus[] = [];
		const resources: GitStatus[] = [];
		(await this._gitVersionControl.getChanges())
			.filter((c) => c.isUntracked)
			.forEach((c) => {
				if (
					c.path.allExtensions?.length &&
					ItemExtensions.includes(c.path.allExtensions[c.path.allExtensions.length - 1] ?? "")
				)
					return items.push(c);
				return resources.push(c);
			});

		return { items, resources };
	}

	private async _getDiffResource(changeFile: GitStatus): Promise<DiffResource> {
		const isNew = changeFile.status === FileStatus.new;
		const isDelete = changeFile.status === FileStatus.delete;
		const isFolder = await this._fp.isFolder(this._catalog.getItemRefPath(changeFile.path));
		return {
			status: changeFile.status,
			type: "resource",
			isChanged: true,
			filePath: { path: changeFile.path.value },
			title: changeFile.path.nameWithExtension,
			content: isFolder ? "" : await this._getNewContent(changeFile.path),
			hunks:
				ResourceExtensions.images.includes(changeFile.path.extension) || isFolder
					? null
					: await this._getDiffByPath(changeFile.path, isNew, isDelete),
		};
	}
	private async _getDiffItems(
		changeFiles: GitStatus[],
		resources: GitStatus[],
	): Promise<{ items: DiffItem[]; resources: GitStatus[] }> {
		const diffItems: DiffItem[] = [];
		for (const c of changeFiles) {
			if (c.status === FileStatus.delete) {
				const oldContent = await this._getOldContent(c.path);
				diffItems.push({
					type: "item",
					order: Number.MAX_SAFE_INTEGER,
					status: FileStatus.delete,
					title: this._fs.parseMarkdown(oldContent).props.title,
					filePath: { path: c.path.value },
					content: oldContent,
					hunks: await this._getDiffByPath(c.path, false, true),
					resources: [],
					isChanged: true,
				});
				continue;
			}
			const itemRef = this._fp.getItemRef(this._catalog.getItemRefPath(c.path));
			const item = this._catalog.findItemByItemRef(itemRef);
			if (!item) {
				resources.push(c);
				continue;
			}

			diffItems.push(
				await this._getDiffItemByItem({
					item,
					isNew: c.status === FileStatus.new,
					isChanged: true,
				}),
			);
		}
		return { items: diffItems.filter((c) => c), resources };
	}

	private async _getDiffItemByItem({
		item,
		isChanged,
		isNew = false,
		isDelete = false,
		resources = [],
	}: {
		item: Item;
		isChanged: boolean;
		isNew?: boolean;
		isDelete?: boolean;
		resources?: DiffResource[];
	}): Promise<DiffItem> {
		const relativeRepPath = this._catalog.getRepositoryRelativePath(item.ref);
		let changeType: FileStatus = FileStatus.modified;
		if (isNew) changeType = FileStatus.new;
		else if (isDelete) changeType = FileStatus.delete;
		return {
			type: "item",
			order: Number.MAX_SAFE_INTEGER,
			status: changeType,
			title: item.getTitle(),
			logicPath: await this._catalog.getPathname(item),
			filePath: { path: relativeRepPath.value },
			content: await this._getNewContent(relativeRepPath),
			hunks: await this._getDiffByPath(relativeRepPath, isNew, isDelete),
			resources,
			isChanged,
		};
	}

	private async _addDiffResources(changeResources: GitStatus[], diffItems: DiffItem[]): Promise<GitStatus[]> {
		const itemResources: GitStatus[] = [];
		this._catalog = await this._sp.parseAllItems(this._catalog);
		for (const changeFile of changeResources) {
			for (const item of this._catalog.getContentItems()) {
				await item.parsedContent.read(async (p) => {
					if (!p) return;
					const linkManager = p.linkManager;
					const resourceManager = p.resourceManager;
					for (const path of [...resourceManager.resources, ...linkManager.resources]) {
						if (resourceManager.getAbsolutePath(path).endsWith(changeFile.path)) {
							itemResources.push(changeFile);
							const diffResource = await this._getDiffResource(changeFile);
							let includes = false;
							for (const diffItem of diffItems) {
								const diffItemResourcePaths = diffItem.resources.map(
									(resource) => resource.filePath.path,
								);
								if (
									!diffItemResourcePaths.includes(diffResource.filePath.path) &&
									diffItem.logicPath === (await this._catalog.getPathname(item))
								) {
									diffItem.resources.push(diffResource);
									includes = true;
								}
							}

							if (!includes) {
								diffItems.push(
									await this._getDiffItemByItem({
										item,
										isChanged: false,
										resources: [diffResource],
									}),
								);
							}
						}
					}
				});
			}
		}
		return changeResources.filter((r) => !itemResources.includes(r));
	}
}
