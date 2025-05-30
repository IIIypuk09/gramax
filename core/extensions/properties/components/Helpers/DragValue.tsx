import Icon from "@components/Atoms/Icon";
import Input from "@components/Atoms/Input";
import { classNames } from "@components/libs/classNames";
import { useDebounce } from "@core-ui/hooks/useDebounce";
import styled from "@emotion/styled";
import t from "@ext/localization/locale/translate";
import { DragItems } from "@ext/properties/models/kanban";
import { memo, useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DragValueProps {
	id: number;
	text: string;
	findValue: (id: number) => { value: any; index: number };
	moveValue: (id: number, index: number) => void;
	onDelete: (id: number) => void;
	updateValue: (text: string, id?: number) => void;
	endDrag: () => void;
	isActions?: boolean;
	className?: string;
}

const DragValue = (props: DragValueProps) => {
	const { id, text, className, findValue, moveValue, onDelete, updateValue, endDrag, isActions } = props;
	const inputRef = useRef<HTMLInputElement>(null);

	const [{ isDragging }, drag, preview] = useDrag({
		type: DragItems.Value,
		item: { id, text },
		canDrag: true,
		end: endDrag,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop(
		() => ({
			accept: DragItems.Value,
			hover({ id: draggedId }) {
				if (draggedId !== id) {
					const { index } = findValue(id);
					if (index === -1) return;
					moveValue(draggedId, index);
				}
			},
		}),
		[findValue, moveValue],
	);

	const handleDelete = useCallback(() => {
		onDelete(id);
	}, [onDelete, id]);

	const handleEdit = useCallback(() => {
		const newText = inputRef.current?.value;
		if (newText?.length) updateValue(newText, id);
	}, [updateValue, inputRef.current]);

	const updateDebounce = useDebounce(() => handleEdit(), 200);

	const onChange = useCallback(() => {
		updateDebounce.cancel();
		updateDebounce.start();
	}, []);

	return (
		<div ref={(ref) => void drop(preview(ref))} className={classNames(className, { isDragging })}>
			<div className="content">
				<Icon code="grip-vertical" isAction className="drag-icon" ref={(ref) => void drag(ref)} />
				<Input type="text" ref={inputRef} defaultValue={text} autoFocus onChange={onChange} />
			</div>
			{isActions && (
				<div className="actions">
					<Icon code="trash-2" onClick={handleDelete} isAction tooltipContent={t("delete")} />
				</div>
			)}
		</div>
	);
};

export default memo(styled(DragValue)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 0.25em;
	margin-bottom: 0.25em;
	border-radius: var(--radius-small);

	.content {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.drag-icon {
		cursor: grab;
	}

	:hover {
		background-color: var(--color-nav-article-drop-target);
	}

	.actions {
		display: flex;
		gap: 0.25em;
		margin-right: 0.25em;
	}

	&.isEditable {
		background-color: var(--color-code-bg);
	}

	&.isDragging {
		background-color: var(--color-nav-article-drop-target);
	}
`);
