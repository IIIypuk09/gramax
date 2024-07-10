import Button, { TextSize } from "@components/Atoms/Button/Button";
import { ButtonStyle } from "@components/Atoms/Button/ButtonStyle";
import IconLink from "@components/Molecules/IconLink";
import ArticlePropsService from "@core-ui/ContextServices/ArticleProps";
import CatalogPropsService from "@core-ui/ContextServices/CatalogProps";
import { getCatalogLinks, useGetArticleLinks } from "@core-ui/getRigthSidebarLinks";
import { usePlatform } from "@core-ui/hooks/usePlatform";
import { cssMedia } from "@core-ui/utils/cssUtils";
import styled from "@emotion/styled";
import useLocalize from "@ext/localization/useLocalize";
import { ItemLink } from "@ext/navigation/NavigationLinks";
import TableOfContents from "@ext/navigation/article/render/TableOfContents";
import { useRef } from "react";
import Actions from "../../../Actions";
import ArticleActions from "../../../Actions/ArticleActions";
import CatalogActions from "../../../Actions/CatalogActions";
import Tags from "../../../Tags";
import Links from "../../layoutComponents";

export default styled(({ itemLinks, className }: { itemLinks: ItemLink[]; className?: string }): JSX.Element => {
	const ref = useRef<HTMLDivElement>(null);
	const isCatalogExist = !!CatalogPropsService.value.name;
	const articleProps = ArticlePropsService.value;
	const showArticleActions = !(articleProps?.errorCode && articleProps.errorCode !== 500);
	const articleLinks = useGetArticleLinks();
	const { isNext } = usePlatform();

	return (
		<div
			ref={ref}
			className={"article-right-sidebar"}
			style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}
		>
			<aside className={className}>
				<Actions />
				{showArticleActions && <TableOfContents />}
				<Links
					articleLinks={showArticleActions ? articleLinks : []}
					catalogLinks={getCatalogLinks()}
					articleChildren={<ArticleActions isCatalogExist={isCatalogExist} />}
					catalogChildren={isCatalogExist ? <CatalogActions itemLinks={itemLinks} /> : null}
				/>
				{showArticleActions && <Tags tags={articleProps.tags} />}
			</aside>
			{isNext && (
				<div className={"gramax-link"}>
					<Button buttonStyle={ButtonStyle.transparent} textSize={TextSize.XS}>
						<IconLink
							className={"gramax-link-text"}
							href={"https://gram.ax/"}
							text={useLocalize("createdInGramax")}
							isExternal
						/>
					</Button>
				</div>
			)}
		</div>
	);
})`
	width: 100%;
	color: var(--color-primary-general);
	background-color: var(--color-contextmenu-bg);

	i {
		font-size: 13px;
		margin-left: -1px;
	}

	ul {
		list-style-type: none;
		margin-left: 0;
	}

	ul li {
		font-size: 12px;
	}

	+ .gramax-link {
		width: 100%;
		display: flex;
		justify-content: end;
		align-items: end;

		flex: 1 1 auto;
		margin-top: 2em;

		.gramax-link-text {
			opacity: 0.6;
			:hover {
				opacity: 1;
			}
		}
	}

	a {
		font-weight: 300;
		color: var(--color-primary-general);
		text-decoration: none;

		&:hover {
			color: var(--color-primary);
		}
	}

	${cssMedia.medium} {
		opacity: 0.8;
	}
`;
