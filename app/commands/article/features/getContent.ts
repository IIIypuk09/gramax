import { AuthorizeMiddleware } from "@core/Api/middleware/AuthorizeMiddleware";
import { DesktopModeMiddleware } from "@core/Api/middleware/DesktopModeMiddleware";
import Path from "@core/FileProvider/Path/Path";
import { Article } from "@core/FileStructue/Article/Article";
import { Command, ResponseKind } from "../../../types/Command";

const getContent: Command<{ catalogName: string; articlePath: Path }, string> = Command.create({
	path: "article/features/getContent",

	kind: ResponseKind.plain,

	middlewares: [new AuthorizeMiddleware(), new DesktopModeMiddleware()],

	async do({ articlePath, catalogName }) {
		const catalog = await this._app.lib.getCatalog(catalogName);
		const article = catalog.findItemByItemPath(articlePath) as Article;
		if (!article) return;
		return article.content;
	},

	params(_, q) {
		const articlePath = new Path(q.path);
		const catalogName = q.catalogName;
		return { articlePath, catalogName };
	},
});

export default getContent;
