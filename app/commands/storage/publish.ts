import { AuthorizeMiddleware } from "@core/Api/middleware/AuthorizeMiddleware";
import Context from "@core/Context/Context";
import Path from "@core/FileProvider/Path/Path";
import { Command, ResponseKind } from "../../types/Command";
import ReloadConfirmMiddleware from "@core/Api/middleware/ReloadConfirmMiddleware";

const publish: Command<
	{ ctx: Context; catalogName: string; message: string; filePaths: string[]; recursive?: boolean },
	void
> = Command.create({
	path: "storage/publish",

	kind: ResponseKind.none,

	middlewares: [new AuthorizeMiddleware(), new ReloadConfirmMiddleware()],

	async do({ ctx, catalogName, message, filePaths, recursive }) {
		const { lib, logger, rp } = this._app;
		const catalog = await lib.getCatalog(catalogName);
		if (!catalog) return;
		const storage = catalog.repo.storage;
		if (!storage) return;
		const data = rp.getSourceData(ctx.cookie, await storage.getSourceName());
		await catalog.repo.publish({
			message,
			filePaths: filePaths.map((p) => new Path(p)),
			recursive,
			data,
			onAdd: () =>
				logger.logTrace(`Added in catalog "${catalogName}". Files: "${filePaths.map((p) => p).join('", "')}"`),
			onCommit: () => logger.logTrace(`Commited in catalog "${catalogName}". Message: "${message}"`),
			onPush: () => logger.logInfo(`Pushed in catalog "${catalogName}".`),
		});
	},

	params(ctx, q, body) {
		return {
			ctx,
			message: q.commitMessage,
			catalogName: q.catalogName,
			recursive: q.recursive === "true",
			filePaths: body as string[],
		};
	},
});

export default publish;
