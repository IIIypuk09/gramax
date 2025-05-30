import styled from "@emotion/styled";
import { ReactNode } from "react";

const ModalLayoutLight = ({ children, className }: { children: ReactNode; className?: string }): JSX.Element => {
	return <div className={className}>{children}</div>;
};

export default styled(ModalLayoutLight)`
	z-index: var(--z-index-foreground);
	width: 100%;
	display: flex;
	font-size: 1rem;
	max-height: 100%;
	align-items: center;
	flex-direction: column;
	border-radius: var(--radius-x-large);
	background: var(--color-contextmenu-bg);

	.form {
		width: 100%;
		padding: 1rem;
		border-radius: var(--radius-x-large);
		background: var(--color-article-bg);
	}

	@media print {
		display: none !important;
	}
`;
