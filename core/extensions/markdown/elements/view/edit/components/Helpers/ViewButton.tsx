import ActionButton from "@components/controls/HoverController/ActionButton";
import PopupMenuLayout from "@components/Layouts/PopupMenuLayout";
import { ReactNode } from "react";

export interface ViewButtonProps {
	icon: string;
	children: ReactNode;
	tooltipText: string;
	disabled?: boolean;
	closeOnSelection?: boolean;
}

const ViewButton = ({ icon, disabled = false, children, tooltipText, closeOnSelection }: ViewButtonProps) => {
	return (
		<PopupMenuLayout
			appendTo={() => document.body}
			hideOnClick={closeOnSelection}
			isInline
			disabled={disabled}
			offset={[0, 10]}
			trigger={<ActionButton icon={icon} tooltipText={tooltipText} />}
		>
			<>{children}</>
		</PopupMenuLayout>
	);
};

export default ViewButton;
