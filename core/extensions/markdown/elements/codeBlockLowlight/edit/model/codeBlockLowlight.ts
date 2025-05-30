import getShiftTabShortcuts from "@ext/markdown/elements/codeBlockLowlight/edit/logic/keys/ShiftTab";
import getTabShortcuts from "@ext/markdown/elements/codeBlockLowlight/edit/logic/keys/Tab";
import lowlight from "@ext/markdown/elements/codeBlockLowlight/edit/logic/Lowlight";
import code_block from "@ext/markdown/elements/codeBlockLowlight/edit/model/schema";
import addShortcuts from "@ext/markdown/elementsUtils/keyboardShortcuts/addShortcuts";
import getExtensionOptions from "@ext/markdown/logic/getExtensionOptions";
import { TextSelection } from "prosemirror-state";
import CodeBlockLowlight, { CodeBlockLowlightOptions } from "@tiptap/extension-code-block-lowlight";
import getBackspaceShortcuts from "@ext/markdown/elements/codeBlockLowlight/edit/logic/keys/Backspace";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockComponent from "@ext/markdown/elements/codeBlockLowlight/edit/component/CodeBlockComponent";

interface CodeBlockOptions extends CodeBlockLowlightOptions {
	monochromeClassName: string;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		code_block: {
			multilineCodeBlock: () => ReturnType;
		};
	}
}

export const languageClassPrefix = "language-";

const ExtendedCodeBlockLowlight = CodeBlockLowlight.extend<CodeBlockOptions>({
	...getExtensionOptions({ schema: code_block, name: "code_block" }),

	addOptions() {
		return {
			...this.parent?.(),
			lowlight,
			defaultLanguage: "none",
			exitOnTripleEnter: true,
			exitOnArrowDown: true,
			monochromeClassName: "monochrome-code-block",
			languageClassPrefix: languageClassPrefix,
			HTMLAttributes: {},
		};
	},

	addNodeView() {
		return ReactNodeViewRenderer(CodeBlockComponent);
	},

	addCommands() {
		return {
			...(this.parent?.() || []),
			multilineCodeBlock:
				(attributes) =>
				({ state, dispatch }) => {
					const { $from, $to } = state.selection;

					const startOfFirstParagraph = $from.before(1);
					const endOfLastParagraph = $to.after(1);

					const paragraphNodes = [];
					state.doc.nodesBetween(startOfFirstParagraph, endOfLastParagraph, (node) => {
						if (node.type.name === "paragraph") paragraphNodes.push(node);
					});

					const codeContent = paragraphNodes.map((node) => node.textContent).join("\n");
					const codeBlock = state.schema.nodes.code_block.create(attributes, state.schema.text(codeContent));

					const tr = state.tr.replaceRangeWith(startOfFirstParagraph, endOfLastParagraph, codeBlock);
					const newPos = tr.doc.resolve(startOfFirstParagraph + codeBlock.nodeSize - 1);
					tr.setSelection(TextSelection.create(tr.doc, newPos.pos));

					dispatch(tr);
					return true;
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			...(this.parent?.() || []),
			...addShortcuts([getShiftTabShortcuts(), getTabShortcuts(), getBackspaceShortcuts()], this.name),
		};
	},
});

export default ExtendedCodeBlockLowlight;
