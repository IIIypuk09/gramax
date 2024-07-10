import { ResponseKind } from "@app/types/ResponseKind";
import ReloadConfirmMiddleware from "@core/Api/middleware/ReloadConfirmMiddleware";
import Context from "@core/Context/Context";
import { AuthorizeMiddleware } from "../../../../core/logic/Api/middleware/AuthorizeMiddleware";
import { Command } from "../../../types/Command";

const abort: Command<{ ctx: Context; catalogName: string }, void> = Command.create({
	path: "versionControl/mergeConflict/abort",

	kind: ResponseKind.none,

	middlewares: [new AuthorizeMiddleware(), new ReloadConfirmMiddleware()],

	async do({ ctx, catalogName }) {
		const { rp, wm } = this._app;
		const workspace = wm.current();
		const catalog = await workspace.getCatalog(catalogName);
		if (!catalog) return;
		const storage = catalog.repo.storage;
		if (!storage) return;
		const sourceData = rp.getSourceData(ctx.cookie, await storage.getSourceName());
		await catalog.repo.abortMerge(sourceData);
		await catalog.update(rp);
	},

	params(ctx, q) {
		const catalogName = q.catalogName;
		return { ctx, catalogName };
	},
});

export default abort;
