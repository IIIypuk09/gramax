import { ResponseKind } from "@app/types/ResponseKind";
import { AuthorizeMiddleware } from "@core/Api/middleware/AuthorizeMiddleware";
import { Command } from "../../types/Command";

const canPull: Command<{ catalogName: string }, boolean> = Command.create({
	path: "storage/canPull",

	kind: ResponseKind.json,

	middlewares: [new AuthorizeMiddleware()],

	async do({ catalogName }) {
		const workspace = this._app.wm.current();
		const catalog = await workspace.getCatalog(catalogName);
		const storage = catalog?.repo.storage;
		if (!storage) return false;
		return catalog.repo.canPull();
	},

	params(_, q) {
		return { catalogName: q.catalogName };
	},
});

export default canPull;
