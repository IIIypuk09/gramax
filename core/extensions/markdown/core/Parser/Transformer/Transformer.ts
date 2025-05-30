import { Token } from "../../render/logic/Markdoc";

class Transformer {
	tableTransform(tokens: Token[]) {
		let isOpen = false;
		let isHeader = false;
		let isCell = false;
		let isCellList = 0;
		for (let idx = 0; idx < tokens.length; idx++) {
			const token = tokens[idx];
			// if (token.type === "tag_open" && token.info === "table") {}
			if (token.type === "tag_open" && (token.info === "table" || token.info.startsWith("table"))) {
				const tableOpen: any = {
					type: "table_open",
					tag: "table",
					nesting: 1,
					attrs: {},
				};
				if (token?.meta) tableOpen.meta = token.meta;
				if (token?.meta?.attributes?.[0]?.value) tableOpen.attrs.header = token.meta.attributes[0].value;
				(tokens as any).splice(idx, 1, tableOpen, { type: "tbody_open", tag: "tbody", nesting: 1 });
				isOpen = true;
			}
			if (token.type === "tag_close" && token.info === "/table") {
				(tokens as any).splice(
					idx,
					1,
					{ type: "tbody_close", tag: "tbody", nesting: -1 },
					{ type: "table_close", tag: "table", nesting: -1 },
				);
				isOpen = false;
			}
			if (isOpen) {
				if (token.type === "hr") {
					if (tokens[idx + 1].type === "hr") {
						(tokens as any).splice(idx, 0, { type: "tr_open", tag: "tr", nesting: 1 });
						idx++;
						(tokens as any).splice(idx, 0, { type: "tr_close", tag: "tr", nesting: -1 });
						idx++;
					}
					tokens.splice(idx, 1);
					idx--;
				}
				if (isCell && (token.type === "bullet_list_open" || token.type === "ordered_list_open")) isCellList++;
				if (isCellList) {
					if (token.type === "bullet_list_close" || token.type === "ordered_list_close") isCellList--;
					continue;
				}
				if (token.type === "bullet_list_open")
					(tokens as any).splice(idx, 1, { type: "tr_open", tag: "tr", nesting: 1 });
				if (token.type === "bullet_list_close")
					(tokens as any).splice(idx, 1, { type: "tr_close", tag: "tr", nesting: -1 });
				if (token.type === "list_item_open") {
					isCell = true;
					const isAnnotation = tokens[idx + 1].type === "annotation";
					const attrs: any = {};
					isHeader = false;
					if (isAnnotation) tokens[idx + 1].meta.attributes.forEach((a) => (attrs[a.name] = a.value));
					if (attrs.isHeader) isHeader = true;
					if (attrs.colwidth && !Array.isArray(attrs.colwidth)) attrs.colwidth = [attrs.colwidth];
					(tokens as any).splice(idx, isAnnotation ? 2 : 1, {
						type: isHeader ? "th_open" : "td_open",
						tag: isHeader ? "th" : "td",
						nesting: 1,
						attrs: attrs,
						meta: isAnnotation ? tokens[idx + 1].meta : null,
					});
				}
				if (token.type === "list_item_close") {
					isCell = false;
					(tokens as any).splice(idx, 1, {
						type: isHeader ? "th_close" : "td_close",
						tag: isHeader ? "th" : "td",
						nesting: -1,
					});
				}
			}
			if (token?.children) token.children = this.tableTransform(token.children);
		}

		for (let idx = 0; idx < tokens.length; idx++) {
			if (
				(tokens[idx].type === "td_open" || tokens[idx].type === "th_open") &&
				tokens[idx + 1].type === "inline"
			) {
				(tokens as any).splice(idx + 1, 1, { type: "paragraph_open", tag: "p", nesting: 1 }, tokens[idx + 1], {
					type: "paragraph_close",
					tag: "p",
					nesting: -1,
				});
			}
		}
		return tokens;
	}

	htmlTransform(tokens: Token[]) {
		let idx = 0;
		while (idx < tokens.length) {
			const token = tokens[idx];
			if (token.type === "tag_open" && token.meta.tag === "html") {
				let text = "";
				let nextID = idx + 1;
				const mode = token.meta.attributes[0].value;

				while (nextID < tokens.length) {
					const nextToken = tokens[nextID];

					if (nextToken.type === "fence") text += nextToken.content.trim();
					else if (nextToken.type === "tag_close" && nextToken.info === "/html") break;
					nextID++;
				}

				(tokens as any).splice(idx, nextID - idx + 1, {
					type: "tag",
					tag: "",
					meta: {
						tag: "html",
						attributes: [
							{ type: "attribute", name: "content", value: text },
							{ type: "attribute", name: "mode", value: mode },
						],
					},
				});
			}

			idx++;
		}
		return tokens;
	}

	imageTransform(tokens: Token[]) {
		for (let idx = 0; idx < tokens.length; idx++) {
			const token = tokens[idx];
			if (token.type === "inline" && token?.tag === "" && token?.children?.[0]?.tag == "img") {
				const imgToken = token.children[0];
				const attrs = imgToken.attrs.filter((attr) => attr[0] !== "alt");
				tokens.splice(idx - 1, 3, { type: "image", attrs: [...attrs, ["alt", imgToken.content]] } as any);
			}
		}
		return tokens;
	}
}

export default Transformer;
