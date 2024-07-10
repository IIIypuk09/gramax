import ButtonsLayout from "@components/Layouts/ButtonLayout";
import Button from "@ext/markdown/core/edit/components/Menu/Button";
import { Editor } from "@tiptap/core";
import { Dispatch, memo } from "react";
import { noteIcons, NoteType } from "../../render/component/Note";
import useLocalize from "@ext/localization/useLocalize";

interface NoteButtonsProps {
	editor: Editor;
	type: NoteType;
	setType: Dispatch<NoteType>;
	title: string;
	className?: string;
}

const Note = ({ editor, type, setType, title }: NoteButtonsProps) => {
	return (
		<ButtonsLayout>
			{Object.values(NoteType).map(
				(value, key) =>
					value !== NoteType.hotfixes && (
						<Button
							tooltipText={useLocalize(`${value}Text`)}
							icon={noteIcons[value]}
							iconStrokeWidth="2"
							iconStyle={{ color: `var(--color-admonition-${value}-br-h)` }}
							key={key}
							onClick={() => {
								setType(value);
								editor.chain().focus().updateNote({ type: value, title }).run();
							}}
							isActive={value === type}
						/>
					),
			)}
		</ButtonsLayout>
	);
};

export default memo(Note);
