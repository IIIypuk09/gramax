import PageDataContextService from "@core-ui/ContextServices/PageDataContext";
import styled from "@emotion/styled";
import useLocalize from "../../extensions/localization/useLocalize";

const BottomInfo = styled(({ className }: { className?: string }) => {
	const config = PageDataContextService.value.conf;
	return (
		<div className={className}>
			<div className="bottom-info">
				<div>{`${useLocalize("version")} ${config.version}${config.branch == "master" ? "" : " dev"}`}</div>
				<div>{"© Gramax " + new Date().getFullYear()}</div>
			</div>
		</div>
	);
})`
	width: 100%;

	.bottom-info {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-size: 14px;

		> div {
			color: var(--color-primary-general);
		}
	}
`;

export default BottomInfo;
