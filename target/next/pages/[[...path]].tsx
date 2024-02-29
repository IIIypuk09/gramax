import ArticlePage from "@components/ArticlePage/ArticlePage";
import HomePage from "@components/HomePage/HomePage";
import PageDataContext from "@core/Context/PageDataContext";
import { ArticlePageData, HomePageData } from "@core/SitePresenter/SitePresenter";
import localizer from "@ext/localization/core/Localizer";
import { ApplyPageMiddleware } from "../logic/Api/ApplyMiddleware";

export default function Home({ data, context }: { data: ArticlePageData & HomePageData; context: PageDataContext }) {
	return context.isArticle ? <ArticlePage data={data}></ArticlePage> : <HomePage data={data}></HomePage>;
}

export function getServerSideProps({ req, res, query }) {
	return ApplyPageMiddleware(async function ({ req, res, query }) {
		const articlePath = query?.path ? "/" + query.path.join("/") : undefined;
		query.l = localizer.extract(articlePath);
		const ctx = this.app.contextFactory.from(req, res, query);

		const data = await this.commands.page.getPageData.do({
			path: decodeURIComponent(localizer.trim(articlePath)),
			ctx,
		});

		return {
			props: data,
		};
	})({ req, res, query });
}
