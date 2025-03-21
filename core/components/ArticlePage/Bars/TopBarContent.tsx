import { TextSize } from "@components/Atoms/Button/Button";
import ButtonLink from "@components/Molecules/ButtonLink";
import Url from "@core-ui/ApiServices/Types/Url";
import PageDataContextService from "@core-ui/ContextServices/PageDataContext";
import { useRouter } from "@core/Api/useRouter";
import { ArticlePageData } from "@core/SitePresenter/SitePresenter";
import styled from "@emotion/styled";
import Search from "../../Actions/Modal/Search";
import Link from "../../Atoms/Link";
import Logo from "../../Logo";
import CatalogActions from "@components/Actions/CatalogActions";
import CatalogPropsService from "@core-ui/ContextServices/CatalogProps";

const TopBarContent = ({ data, className }: { data: ArticlePageData; className?: string }) => {
	const logoImageUrl = PageDataContextService.value.conf.logo.imageUrl;
	const catalogProps = CatalogPropsService.value;
	const isCatalogExist = !!catalogProps.name;

	return (
		<div className={className}>
			{!logoImageUrl && (
				<Link className="home" href={Url.fromRouter(useRouter(), { pathname: "/" })} dataQa="home-page-button">
					<ButtonLink textSize={TextSize.L} iconCode="grip" />
				</Link>
			)}
			<Logo imageUrl={logoImageUrl} />
			<div className="iconWrapper">
				<Search isHomePage={false} catalogLinks={[data.catalogProps.link]} itemLinks={data.itemLinks} />
				<CatalogActions isCatalogExist={isCatalogExist} itemLinks={data.itemLinks} />
			</div>
		</div>
	);
};

export default styled(TopBarContent)`
	gap: 14px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.home {
		display: flex;
	}

	.iconWrapper {
		display: flex;
		gap: 0.5em;
		align-items: center;
		vertical-align: middle;
	}
`;
