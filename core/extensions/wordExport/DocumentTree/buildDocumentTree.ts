import Context from "@core/Context/Context";
import { Article } from "@core/FileStructue/Article/Article";
import parseContent from "@core/FileStructue/Article/parseContent";
import { ItemFilter } from "@core/FileStructue/Catalog/Catalog";
import type { ReadonlyCatalog } from "@core/FileStructue/Catalog/ReadonlyCatalog";
import { Category } from "@core/FileStructue/Category/Category";
import { Item } from "@core/FileStructue/Item/Item";
import { ItemType } from "@core/FileStructue/Item/ItemType";
import { resolveLanguage } from "@ext/localization/core/model/Language";
import MarkdownParser from "@ext/markdown/core/Parser/Parser";
import ParserContextFactory from "@ext/markdown/core/Parser/ParserContext/ParserContextFactory";
import { Tag } from "@ext/markdown/core/render/logic/Markdoc";
import { SystemProperties } from "@ext/properties/models";
import { Display } from "@ext/properties/models/displays";
import MarkdownElementsFilter from "@ext/wordExport/MarkdownElementsFilter";
import { TitleInfo } from "@ext/wordExport/options/WordTypes";
import { DocumentTree } from "./DocumentTree";

const buildDocumentTree = async (
	isCategory: boolean,
	isCatalog: boolean,
	item: Item,
	exportedKeys: Set<string>,
	catalog: ReadonlyCatalog,
	ctx: Context,
	parser: MarkdownParser,
	parserContextFactory: ParserContextFactory,
	filters: ItemFilter[],
	titlesMap: Map<string, TitleInfo>,
	level: number = 0,
	number: string = "",
) => {
	const filter = new MarkdownElementsFilter(exportedKeys);

	if (!isCatalog) await parseContent(item as Article, catalog, ctx, parser, parserContextFactory, false);

	const heading: DocumentTree = await (item as Article).parsedContent.read((p) => ({
		name: isCatalog ? catalog.props.title : item.getTitle() || catalog.name,
		content: !isCatalog ? filter.getSupportedTree(p?.renderTree) : "",
		resourceManager: !isCatalog ? p?.resourceManager : undefined,
		level: level,
		number: number,
		parserContext: !isCatalog
			? parserContextFactory.fromArticle(item as Article, catalog, resolveLanguage(), true)
			: null,
		children: [],
	}));

	const fileName = item.getFileName();
	if (fileName) {
		titlesMap.set(fileName, { title: heading.name, order: number });
	}

	if (!isCategory && !isCatalog) return heading;

	if (item.type === ItemType.category) {
		heading.children = await Promise.all(
			(item as Category).getFilteredItems(filters, catalog)?.map(async (subItem, index) => {
				return await buildDocumentTree(
					isCategory || isCatalog,
					false,
					subItem as Category,
					exportedKeys,
					catalog,
					ctx,
					parser,
					parserContextFactory,
					filters,
					titlesMap,
					level + 1,
					`${number}${index + 1}.`,
				);
			}) || [],
		);

		const contentAsTag = heading.content as Tag;
		addViewTag(contentAsTag);
	} else heading.children = [];

	return heading;
};

const addViewTag = (content: any) => {
	if (typeof content === "object" && content !== null) {
		content.children = content.children ?? [];
		if (content.children.length === 0) {
			content.children.push(
				new Tag("View", {
					defs: [
						{
							name: SystemProperties.hierarchy,
							value: ["none"],
						},
					],
					display: Display.List,
				}),
			);
		}
	}
};

export default buildDocumentTree;
