import styled from "@emotion/styled";
import DiagramError from "@ext/markdown/elements/diagrams/component/DiagramError";
import { forwardRef, MutableRefObject, useState } from "react";
import DiagramType from "../../../../../logic/components/Diagram/DiagramType";
import Lightbox from "@components/Atoms/Image/modalImage/Lightbox";
import { classNames } from "@components/libs/classNames";

interface DiagramProps {
	data?: string;
	error?: Error;
	diagramName: DiagramType;
	openEditor?: () => void;
	className?: string;
	isFull?: boolean;
	background?: boolean;
	title?: string;
	downloadSrc?: string;
	isFrozen?: boolean;
}

const DiagramRender = forwardRef((props: DiagramProps, ref?: MutableRefObject<HTMLDivElement>) => {
	const { data, error, diagramName, className, isFrozen, background = true, title, downloadSrc, openEditor } = props;

	const [isOpen, setOpen] = useState(false);

	if (error) return <DiagramError error={error} diagramName={diagramName} />;

	return (
		<div
			className={classNames(`${className} diagram-image`, { "diagram-background": background })}
			data-focusable="true"
		>
			{isOpen && (
				<Lightbox
					id={diagramName}
					svg={data}
					title={title}
					onClose={() => setOpen(false)}
					openedElement={ref}
					downloadSrc={downloadSrc}
					modalEdit={openEditor}
					modalStyle={{
						display: "flex",
						justifyContent: "center",
						backgroundColor: "var(--color-diagram-bg)",
						borderRadius: "var(--radius-large)",
						width: diagramName === DiagramType.mermaid ? "30em" : "auto",
					}}
				/>
			)}
			<div
				ref={ref}
				className={classNames(className, { isFrozen }, [`${diagramName}-diagram`])}
				onDoubleClick={() => setOpen(true)}
				dangerouslySetInnerHTML={{ __html: data }}
			/>
		</div>
	);
});

export default styled(DiagramRender)`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;

	p {
		line-height: 1.5em;
	}

	${(p) => {
		return p.diagramName == DiagramType["c4-diagram"]
			? `.${DiagramType["c4-diagram"]}-diagram {
					height: ${p.isFull ? "100%" : "33rem"} !important;
			}
			`
			: p.diagramName == DiagramType.mermaid
			? ``
			: "";
	}}

	.isFrozen {
		opacity: 0.4;
	}

	svg {
		pointer-events: none;
		user-select: none;
		background: none !important;
		height: ${(p) => (p.isFull ? "100%" : "auto")} !important;
		max-width: 100%;
		max-height: 100% !important;
	}
`;
