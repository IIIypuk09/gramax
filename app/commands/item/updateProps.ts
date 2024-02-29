import { AuthorizeMiddleware } from "@core/Api/middleware/AuthorizeMiddleware";
import { DesktopModeMiddleware } from "@core/Api/middleware/DesktopModeMiddleware";
import ReloadConfirmMiddleware from "@core/Api/middleware/ReloadConfirmMiddleware";
import Context from "@core/Context/Context";
import Path from "@core/FileProvider/Path/Path";
import ResourceUpdater from "@core/Resource/ResourceUpdater";
import { ClientArticleProps } from "@core/SitePresenter/SitePresenter";
import { Command, ResponseKind } from "../../types/Command";

const updateProps: Command<{ ctx: Context; catalogName: string; props: ClientArticleProps }, string> = Command.create({
	path: "item/updateProps",

	kind: ResponseKind.plain,

	middlewares: [new AuthorizeMiddleware(), new DesktopModeMiddleware(), new ReloadConfirmMiddleware()],

	async do({ ctx, catalogName, props }) {
		const { lib, parser, parserContextFactory, formatter } = this._app;

		const catalog = await lib.getCatalog(catalogName);
		const item = catalog.findItemByItemPath(new Path(props.ref.path));
		if (!item) return;

		const resourceUpdater = new ResourceUpdater(ctx, catalog, parser, parserContextFactory, formatter);
		const newItem = await item.updateProps(props, resourceUpdater, catalog.getRootCategory().props);
		return await catalog.getPathname(newItem);
	},

	params(ctx, q, body) {
		const catalogName = q.catalogName;
		const props = body;
		return { ctx, catalogName, props };
	},
});

export default updateProps;
