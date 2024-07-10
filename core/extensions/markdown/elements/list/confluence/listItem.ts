import NodeConverter from "@ext/confluence/actions/Import/logic/NodeConverter";

const listItem: NodeConverter = (listItemNode) => {
	return {
		type: "list_item",
		content: listItemNode.content,
	};
};

export default listItem;
