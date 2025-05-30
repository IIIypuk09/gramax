import Tag from "./ast/tag";
import type { Schema } from "./types";

export const document: Schema = {
	render: "article",
	children: ["heading", "paragraph", "image", "table", "tag", "fence", "blockquote", "list", "hr"],
};

export const heading: Schema = {
	children: ["inline"],
	attributes: {
		level: { type: Number, render: false, required: true },
	},
	async transform(node, config) {
		return new Tag(
			`h${node.attributes["level"]}`,
			node.transformAttributes(config),
			await node.transformChildren(config),
		);
	},
};

export const paragraph: Schema = {
	render: "p",
	children: ["inline"],
};

export const image: Schema = {
	render: "img",
	attributes: {
		src: { type: String, required: true },
		alt: { type: String },
		title: { type: String },
		// width/height attributes will need to be to be implemented as an extension to markdown-it
	},
};

export const fence: Schema = {
	render: "pre",
	attributes: {
		content: { type: String, render: false, required: true },
		language: { type: String, render: "data-language" },
		process: { type: Boolean, render: false, default: true },
	},
	async transform(node, config) {
		const attributes = node.transformAttributes(config);
		const children = node.children.length ? await node.transformChildren(config) : [node.attributes.content];

		return new Tag("pre", attributes, children);
	},
};

export const blockquote: Schema = {
	render: "blockquote",
	children: ["heading", "paragraph", "image", "table", "tag", "fence", "blockquote", "list", "hr"],
	async transform(node, config, parent) {
		node.attributes.depth = (parent.attributes.depth ?? -1) + 1;
		return new Tag(`blockquote`, { depth: node.attributes.depth }, await node.transformChildren(config));
	},
};

export const item: Schema = {
	render: "li",
	attributes: {
		checked: { type: Boolean },
		isTaskItem: { type: Boolean },
	},
	children: ["inline", "heading", "paragraph", "image", "table", "tag", "fence", "blockquote", "list", "hr"],
	async transform(node, config, parent) {
		node.attributes.depth = parent.attributes.depth;
		return new Tag(`Li`, { ...node.attributes }, await node.transformChildren(config));
	},
};

export const list: Schema = {
	children: ["item"],
	attributes: {
		ordered: { type: Boolean, render: false, required: true },
	},
	async transform(node, config, parent) {
		node.attributes.depth = (parent.attributes.depth ?? -1) + 1;
		return new Tag(
			node.attributes.ordered ? "ol" : "ul",
			{ depth: node.attributes.depth },
			await node.transformChildren(config),
		);
	},
};

export const hr: Schema = {
	render: "hr",
};

export const table: Schema = {
	render: "table",
	children: ["tbody", "thead"],
	async transform(node, config) {
		return new Tag("Table", node.attributes, await node.transformChildren(config));
	},
};

export const td: Schema = {
	render: "td",
	children: ["inline", "heading", "paragraph", "image", "table", "tag", "fence", "blockquote", "list", "hr"],
	attributes: {
		colspan: { type: Number },
		rowspan: { type: Number },
		colwidth: { type: Array },
		align: { type: String },
	},
};

export const th: Schema = {
	render: "th",
	attributes: {
		colspan: { type: Number },
		rowspan: { type: Number },
		colwidth: { type: Array },
		align: { type: String },
	},
};

export const tr: Schema = {
	render: "tr",
	children: ["th", "td"],
};

export const tbody: Schema = {
	render: "tbody",
	children: ["tr", "tag"],
};

export const thead: Schema = {
	render: "thead",
	children: ["tr"],
};

export const strong: Schema = {
	render: "strong",
	children: ["em", "s", "link", "code", "text", "tag"],
};

export const em: Schema = {
	render: "em",
	children: ["strong", "s", "link", "code", "text", "tag"],
};

export const s: Schema = {
	render: "s",
	children: ["strong", "em", "link", "code", "text", "tag"],
};

export const inline: Schema = {
	children: ["strong", "em", "s", "code", "text", "tag", "link", "image", "hardbreak", "softbreak"],
};

export const link: Schema = {
	render: "a",
	children: ["strong", "em", "s", "code", "text", "tag"],
	attributes: {
		href: { type: String, required: true },
		title: { type: String },
	},
};

export const code: Schema = {
	render: "code",
	attributes: {
		content: { type: String, render: false, required: true },
	},
	transform(node, config) {
		const attributes = node.transformAttributes(config);
		return new Tag("code", attributes, [node.attributes.content]);
	},
};

export const text: Schema = {
	attributes: {
		content: { type: String, required: true },
	},
	transform(node) {
		return node.attributes.content;
	},
};

export const hardbreak: Schema = {
	render: "br",
};

export const softbreak: Schema = {
	transform(_node, _config) {
		return " ";
	},
};

export const error = {};
