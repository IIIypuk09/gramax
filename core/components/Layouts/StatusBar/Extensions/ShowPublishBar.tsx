import Icon from "@components/Atoms/Icon";
import StatusBarWrapper from "@components/Layouts/StatusBar/StatusBarWrapper";
import GitIndexService from "@core-ui/ContextServices/GitIndexService";
import styled from "@emotion/styled";
import t from "@ext/localization/locale/translate";

const Counter = styled.span`
	font-size: 10px;
	display: flex;
	align-items: center;
	height: 100%;

	i {
		font-size: 8px;
	}
`;

const ShowPublishBar = ({ onClick, isShow }: { onClick: () => void; isShow: boolean }) => {
	const overview = GitIndexService.getOverview();
	const total = overview.added + overview.deleted + overview.modified;

	return (
		<StatusBarWrapper
			dataQa="qa-publish-trigger"
			onClick={onClick}
			iconCode="custom-cloud-up"
			tooltipText={t("publish-changes")}
			iconStyle={{ fill: isShow ? "var(--color-primary)" : "white" }}
			isShow={isShow}
		>
			{total > 0 && (
				<Counter>
					{total}
					<Icon code="move-up" strokeWidth="2" viewBox="2 0 20 20"></Icon>
				</Counter>
			)}
		</StatusBarWrapper>
	);
};

export default ShowPublishBar;
