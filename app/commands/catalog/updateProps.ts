import { ResponseKind } from "@app/types/ResponseKind";
import { AuthorizeMiddleware } from "@core/Api/middleware/AuthorizeMiddleware";
import { DesktopModeMiddleware } from "@core/Api/middleware/DesktopModeMiddleware";
import ReloadConfirmMiddleware from "@core/Api/middleware/ReloadConfirmMiddleware";
import Context from "@core/Context/Context";
import ResourceUpdater from "@core/Resource/ResourceUpdater";
import { ClientCatalogProps } from "@core/SitePresenter/SitePresenter";
import CatalogEditProps from "@ext/catalog/actions/propsEditor/model/CatalogEditProps.schema";
import { Command } from "../../types/Command";

const updateProps: Command<{ ctx: Context; catalogName: string; props: CatalogEditProps }, ClientCatalogProps> =
	Command.create({
		path: "catalog/updateProps",

		kind: ResponseKind.json,

		middlewares: [new AuthorizeMiddleware(), new DesktopModeMiddleware(), new ReloadConfirmMiddleware()],

		async do({ ctx, catalogName, props }) {
			const { wm, sitePresenterFactory, parser, parserContextFactory, formatter, rp } = this._app;
			const workspace = wm.current();

			const catalog = await workspace.getCatalog(catalogName);
			if (!catalog) return;

			const resourceUpdater = new ResourceUpdater(ctx, catalog, parser, parserContextFactory, formatter);
			const newCatalog = await catalog.updateProps(resourceUpdater, rp, props);
			return sitePresenterFactory.fromContext(ctx).serializeCatalogProps(newCatalog);
		},

		params(ctx, q, body) {
			const catalogName = q.catalogName;
			const props = body as CatalogEditProps;
			return { ctx, props, catalogName };
		},
	});

export default updateProps;
