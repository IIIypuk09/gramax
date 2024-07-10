import NodeConverter from "@ext/confluence/actions/Import/logic/NodeConverter";
import convertUnsupportedNode from "@ext/confluence/actions/Import/logic/convertUnsupportedNode";

const inlineCard: NodeConverter = (inlineCardNode, ctx) => {
	if (!inlineCardNode?.attrs?.url) return convertUnsupportedNode(inlineCardNode, ctx.confluencePageUrl);
	return {
		type: "text",
		text: inlineCardNode.attrs.url.replace(/~/g, "%7E"),
		marks: [
			{
				type: "link",
				attrs: { href: inlineCardNode.attrs.url, resourcePath: "", hash: "", isFile: false },
			},
		],
	};
};

export default inlineCard;
