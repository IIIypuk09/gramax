import { ResponseKind } from "@app/types/ResponseKind";
import { AuthorizeMiddleware } from "@core/Api/middleware/AuthorizeMiddleware";
import { NetworkConnectMiddleWare } from "@core/Api/middleware/NetworkConntectMiddleware";
import { SilentMiddleware } from "@core/Api/middleware/SilentMiddleware";
import Context from "@core/Context/Context";
import { Command } from "../../types/Command";

const haveToPull: Command<{ ctx: Context; shouldFetch: boolean; catalogName: string }, boolean> = Command.create({
	path: "storage/haveToPull",

	kind: ResponseKind.json,

	middlewares: [new SilentMiddleware(), new NetworkConnectMiddleWare(), new AuthorizeMiddleware()],

	async do({ ctx, shouldFetch, catalogName }) {
		const { wm, logger, rp } = this._app;
		const workspace = wm.current();

		const catalog = await workspace.getContextlessCatalog(catalogName);
		const storage = catalog?.repo.storage;
		if (!storage || catalog.repo.isBare) return false;
		const data = rp.getSourceData(ctx, await storage.getSourceName());
		return catalog.repo.isShouldSync({
			data,
			shouldFetch,
			onFetch: () => logger.logTrace(`Fetched in catalog "${catalogName}".`),
		});
	},

	params(ctx, q) {
		return { ctx, catalogName: q.catalogName, shouldFetch: q.shouldFetch == "true" };
	},
});

export default haveToPull;
