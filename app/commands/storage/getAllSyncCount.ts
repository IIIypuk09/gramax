import { ResponseKind } from "@app/types/ResponseKind";
import { AuthorizeMiddleware } from "@core/Api/middleware/AuthorizeMiddleware";
import { SilentMiddleware } from "@core/Api/middleware/SilentMiddleware";
import type Context from "@core/Context/Context";
import { Command } from "../../types/Command";

const getAllSyncCount: Command<
	{ ctx: Context; shouldFetch?: boolean },
	{ [catalogName: string]: { pull?: number; push?: number; hasChanges?: boolean; errorMessage?: string } }
> = Command.create({
	path: "storage/getAllSyncCount",

	kind: ResponseKind.json,

	middlewares: [new AuthorizeMiddleware(), new SilentMiddleware()],

	async do({ ctx, shouldFetch }) {
		const { rp, wm } = this._app;
		const workspace = wm.current();

		const res = {};
		const promises = [];

		for (const [name, entry] of workspace.getCatalogEntries().entries()) {
			if (!entry.repo?.storage) continue;
			const promise = async () => {
				try {
					if (shouldFetch) {
						const data = rp.getSourceData(ctx.cookie, await entry.repo.storage.getSourceName());
						if (!data) {
							res[name] = { errorMessage: "storageNotConnected" };
							return;
						}

						await entry.repo.storage.fetch(data);
						await entry.repo.storage.updateSyncCount();
					}

					res[name] = await entry.repo.storage.getSyncCount();
				} catch (err) {
					res[name] = { errorMessage: err.toString() };
				}
			};
			promises.push(promise());
		}

		await Promise.all(promises);
		return res;
	},

	params(ctx, q) {
		return { ctx, shouldFetch: q.fetch == "true" };
	},
});

export default getAllSyncCount;
