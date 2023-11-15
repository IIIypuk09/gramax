import Context from "@core/Context/Context";
import PageDataContext from "@core/Context/PageDataContext";
import UserInfo from "@ext/security/logic/User/UserInfo2";
import Application from "../../types/Application";

const getPageDataContext = ({
	ctx,
	app,
	isArticle,
	userInfo,
}: {
	ctx: Context;
	app: Application;
	isArticle: boolean;
	userInfo?: UserInfo;
}): PageDataContext => {
	return {
		lang: ctx.lang,
		theme: ctx.theme,
		domain: ctx.domain,
		userInfo: userInfo ?? ctx.user.info ?? null,
		isLogged: ctx.user.isLogged,
		sourceDatas: app.sp.getSourceDatas(ctx.cookie) ?? [],
		isArticle,
		conf: {
			version: app.conf.gramaxVersion,
			basePath: app.conf.basePath.value,
			isReadOnly: app.conf.isReadOnly,
			isServerApp: app.conf.isServerApp,
			isProduction: app.conf.isProduction,
			enterpriseServerUrl: app.conf.enterpriseServerUrl,
			bugsnagApiKey: app.conf.bugsnagApiKey,
		},
	};
};

export default getPageDataContext;
