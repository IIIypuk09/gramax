import ApiUrlCreator from "@core-ui/ApiServices/ApiUrlCreator";
import ApiUrlCreatorService from "@core-ui/ContextServices/ApiUrlCreator";
import ArticlePropsService from "@core-ui/ContextServices/ArticleProps";
import ArticleRefService from "@core-ui/ContextServices/ArticleRef";
import CatalogPropsService from "@core-ui/ContextServices/CatalogProps";
import CommentCounterService from "@core-ui/ContextServices/CommentCounter";
import IsEditService from "@core-ui/ContextServices/IsEdit";
import IsFirstLoadService from "@core-ui/ContextServices/IsFirstLoadService";
import IsMacService from "@core-ui/ContextServices/IsMac";
import IsMenuBarOpenService from "@core-ui/ContextServices/IsMenuBarOpenService";
import IsOfflineService from "@core-ui/ContextServices/IsOfflineService";
import PageDataContextService from "@core-ui/ContextServices/PageDataContext";
import RefreshPageService from "@core-ui/ContextServices/RefreshPageContext";
import ScrollWebkitService from "@core-ui/ContextServices/ScrollWebkit";
import SearchQueryService from "@core-ui/ContextServices/SearchQuery";
import SidebarsIsPinService from "@core-ui/ContextServices/SidebarsIsPin";
import useIsFirstLoad from "@core-ui/useIsFirstLoad";
import { useRouter } from "@core/Api/useRouter";
import { ArticlePageData, HomePageData } from "@core/SitePresenter/SitePresenter";
import ThemeService from "../extensions/Theme/components/ThemeService";
import PageDataContext from "../logic/Context/PageDataContext";
import IsOpenModalService from "../ui-logic/ContextServices/IsOpenMpdal";
import ModalToOpenService from "../ui-logic/ContextServices/ModalToOpenService/ModalToOpenService";
import useOnUpdateFuncs from "../ui-logic/useOnUpdateFuncs";

export default function ContextProviders({
	pageProps,
	apiHost,
	children,
	refreshPage,
}: {
	pageProps: { data: HomePageData & ArticlePageData; context: PageDataContext };
	apiHost?: string;
	refreshPage?: () => Promise<void>;
	children: JSX.Element;
}) {
	const basePath = apiHost ?? useRouter().basePath;
	const isArticlePage = pageProps?.context?.isArticle;
	const isFirstLoad = useIsFirstLoad();

	if (!pageProps || !pageProps.context) return children;

	const apiUrlCreator: ApiUrlCreator = new ApiUrlCreator(
		basePath,
		pageProps.context.lang,
		pageProps.context.theme,
		pageProps.context.isLogged,
		isArticlePage ? pageProps.data.catalogProps.name : null,
		isArticlePage ? pageProps.data.articleProps.ref.path : null,
		pageProps.context.conf.ssoServerUrl,
	);

	return (
		<IsOfflineService.Provider>
			<ApiUrlCreatorService.Provider value={apiUrlCreator}>
				<PageDataContextService.Provider value={pageProps.context}>
					<RefreshPageService.Provider refresh={refreshPage}>
						<ThemeService.Provider value={pageProps.context.theme}>
							<IsMacService.Provider>
								<SearchQueryService.Provider>
									<IsOpenModalService.Provider>
										<ScrollWebkitService.Provider>
											<SidebarsIsPinService.Provider>
												<ModalToOpenService.Provider>
													<>
														{isArticlePage ? (
															<IsMenuBarOpenService.Provider>
																<ArticleRefService.Provider>
																	<ArticlePropsService.Provider
																		value={pageProps.data.articleProps}
																	>
																		<CatalogPropsService.Provider
																			value={pageProps.data.catalogProps}
																		>
																			<IsEditService.Provider>
																				<IsFirstLoadService.Provider
																					value={isFirstLoad}
																				>
																					<OnUpdateAppFuncs>
																						<>
																							{pageProps.context
																								.isLogged ? (
																								<CommentCounterService.Provider
																									deps={[pageProps]}
																								>
																									{children}
																								</CommentCounterService.Provider>
																							) : (
																								children
																							)}
																						</>
																					</OnUpdateAppFuncs>
																				</IsFirstLoadService.Provider>
																			</IsEditService.Provider>
																		</CatalogPropsService.Provider>
																	</ArticlePropsService.Provider>
																</ArticleRefService.Provider>
															</IsMenuBarOpenService.Provider>
														) : (
															<IsFirstLoadService.Provider value={isFirstLoad}>
																<OnUpdateAppFuncs>{children}</OnUpdateAppFuncs>
															</IsFirstLoadService.Provider>
														)}
													</>
												</ModalToOpenService.Provider>
											</SidebarsIsPinService.Provider>
										</ScrollWebkitService.Provider>
									</IsOpenModalService.Provider>
								</SearchQueryService.Provider>
							</IsMacService.Provider>
						</ThemeService.Provider>
					</RefreshPageService.Provider>
				</PageDataContextService.Provider>
			</ApiUrlCreatorService.Provider>
		</IsOfflineService.Provider>
	);
}

const OnUpdateAppFuncs = ({ children }: { children: JSX.Element }) => {
	useOnUpdateFuncs();
	return children;
};
