import LinkResourceManager from "@core/Link/LinkResourceManager";
import Path from "../../../../../logic/FileProvider/Path/Path";
import FileProvider from "../../../../../logic/FileProvider/model/FileProvider";
import { Article } from "../../../../../logic/FileStructue/Article/Article";
import { Item } from "../../../../../logic/FileStructue/Item/Item";
import ResourceManager from "../../../../../logic/Resource/ResourceManager";
import { TableDB } from "../../../../../logic/components/tableDB/table";
import UiLanguage from "../../../../localization/core/model/Language";
import UserInfo from "../../../../security/logic/User/UserInfo";
import MarkdownFormatter from "../../edit/logic/Formatter/Formatter";
import MarkdownParser from "../Parser";
import type { ReadonlyCatalog } from "@core/FileStructue/Catalog/ReadonlyCatalog";
import ParserContext, { BaseContext } from "./ParserContext";

export default class ArticleContext extends BaseContext implements ParserContext {
	private _linkManager: LinkResourceManager;
	private _resourceManager: ResourceManager;

	constructor(
		private _article: Article,
		private _catalog: ReadonlyCatalog,
		private _basePath: Path,
		private _language: UiLanguage,
		private _isLogged: boolean,
		private _diagramRendererServerUrl: string,
		private _tablesManager: TableDB,
		private _getUserByMail: (mail: string) => Promise<UserInfo> | UserInfo,
		readonly fp: FileProvider,
		readonly parser: MarkdownParser,
		readonly formatter: MarkdownFormatter,
	) {
		super();
		const rootPath = this._catalog?.getRootCategoryRef().path.parentDirectoryPath;
		const basePath = rootPath?.subDirectory(this._article.ref.path.parentDirectoryPath);

		this._linkManager = new LinkResourceManager(fp, basePath, rootPath);
		this._resourceManager = new ResourceManager(fp, basePath, rootPath);
	}

	getDiagramRendererServerUrl(): string {
		return this._diagramRendererServerUrl;
	}

	getResourceManager(): ResourceManager {
		return this._resourceManager;
	}

	getLinkManager(): LinkResourceManager {
		return this._linkManager;
	}

	getItemByPath(itemPath: Path): Item {
		return this._catalog.findItemByItemPath(itemPath);
	}

	getArticle() {
		return this._article;
	}

	getCatalog() {
		return this._catalog;
	}

	getStorageId() {
		return this._article.ref.storageId;
	}

	getRootLogicPath() {
		return new Path(this._catalog?.name);
	}

	getRootPath() {
		return this._catalog?.getRootCategoryPath();
	}

	getBasePath() {
		return this._basePath;
	}

	getIsLogged() {
		return this._isLogged;
	}

	getLanguage() {
		return this._language;
	}

	getTablesManager(): TableDB {
		return this._tablesManager;
	}

	async getUserByMail(mail: string): Promise<UserInfo> {
		return await this._getUserByMail(mail);
	}

	createContext(article: Article) {
		return new ArticleContext(
			article,
			this._catalog,
			this._basePath,
			this._language,
			this._isLogged,
			this._diagramRendererServerUrl,
			this._tablesManager,
			this._getUserByMail,
			this.fp,
			this.parser,
			this.formatter,
		);
	}
}
