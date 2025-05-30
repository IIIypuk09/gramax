import { Level } from "@ext/markdown/elements/heading/edit/model/heading";
import OPEN_API_NAME from "@ext/markdown/elements/openApi/name";
import { Selection } from "@tiptap/pm/state";

export type Attrs = { level: Level; notFirstInList?: boolean };

export type NodeType =
	| "html"
	| "view"
	| "heading"
	| "paragraph"
	| "blockquote"
	| "orderedList"
	| "bulletList"
	| "taskList"
	| "table"
	| "cut"
	| "note"
	| "tabs"
	| "snippet"
	| "diagramsMenuGroup"
	| "drawio"
	| "diagrams"
	| "image"
	| "icon"
	| "video"
	| typeof OPEN_API_NAME
	| "code_block";

export type Mark = "link" | "strong" | "em" | "code" | "file" | "comment" | "s";

export interface NodeValues {
	action?: NodeType;
	mark?: Mark;
	attrs?: Attrs;
}

export interface ActionContextValue {
	actions: NodeType[];
	marks: Mark[];
	attrs: Partial<Attrs>;
	selection: Selection;
}

export interface ButtonState {
	isActive: boolean;
	disabled: boolean;
}
