import ApiUrlCreator from "@core-ui/ApiServices/ApiUrlCreator";
import { ClientArticleProps } from "@core/SitePresenter/SitePresenter";
import { copyArticleResource } from "@ext/markdown/elements/copyArticles/copyPasteArticleResource";
import { OnLoadResource } from "@ext/markdown/elements/copyArticles/onLoadResourceService";
import initArticleResource from "@ext/markdown/elementsUtils/AtricleResource/initArticleResource";
import { Editor, Extension } from "@tiptap/core";
import { Node } from "@tiptap/pm/model";
import { Plugin, Transaction } from "@tiptap/pm/state";
import { ReplaceAroundStep, ReplaceStep } from "@tiptap/pm/transform";
import { EditorView } from "prosemirror-view";

const processNode = (
	childNode: Node,
	articleProps: ClientArticleProps,
	apiUrlCreator: ApiUrlCreator,
	onLoadResource: OnLoadResource,
) => {
	if (!childNode.isText && Object.keys(childNode.attrs).length !== 0 && childNode.attrs.src) {
		const splitted = childNode.attrs.src.slice(2).split(".");
		void initArticleResource(
			articleProps,
			apiUrlCreator,
			onLoadResource,
			onLoadResource.getBuffer(childNode.attrs.src),
			splitted[1],
			splitted[0],
		);
	}

	for (let index = 0; index < childNode.content.childCount; index++) {
		processNode(childNode.content.child(index), articleProps, apiUrlCreator, onLoadResource);
	}
};

const selectNodes = (editor: Editor): boolean => {
	const { doc, selection } = editor.state;
	if (doc.childCount < 2) return false;

	const { $from } = selection;
	const isFirstNode = editor.state.doc.firstChild === $from.parent;
	const firstNodeSize = doc.firstChild.nodeSize;
	const from = isFirstNode ? 1 : firstNodeSize;
	const to = isFirstNode ? 1 + doc.firstChild.content.size : doc.content.size;

	editor.commands.setTextSelection({
		from: from,
		to: to,
	});

	return true;
};

const CopyArticles = Extension.create({
	name: "copyArticles",
	addOptions() {
		return {};
	},

	addKeyboardShortcuts() {
		return {
			"Mod-a": () => selectNodes(this.editor),
			"Mod-A": () => selectNodes(this.editor),
			"Mod-Z": () => this.editor.commands.undo(),
			"Mod-Y": () => this.editor.commands.redo(),
			"Shift-Mod-Z": () => this.editor.commands.redo(),
		};
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					handleDOMEvents: {
						copy: (view: EditorView, event: ClipboardEvent) => {
							event.preventDefault();
							copyArticleResource(view, event, this.options.onLoadResource);
						},
						cut: (view: EditorView, event: ClipboardEvent) => {
							event.preventDefault();
							copyArticleResource(view, event, this.options.onLoadResource, view.editable);
						},
					},
					transformPastedHTML(html) {
						return html?.replaceAll("[object Object]", "");
					},
				},
				appendTransaction: (transactions: Transaction[]) => {
					transactions.forEach((tr: Transaction) => {
						if (!tr.docChanged || !tr.getMeta("history$")) return;

						tr.steps.forEach((step) => {
							if (step instanceof ReplaceStep || step instanceof ReplaceAroundStep) {
								step.slice.content.forEach((node: Node) => {
									processNode(
										node,
										this.options.articleProps,
										this.options.apiUrlCreator,
										this.options.onLoadResource,
									);
								});
							}
						});
					});

					return null;
				},
			}),
		];
	},
});

export default CopyArticles;
