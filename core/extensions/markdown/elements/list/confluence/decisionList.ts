import NodeConverter from "@ext/confluence/actions/Import/logic/NodeConverter";

const decisionList: NodeConverter = (decisionListNode) => {
	return {
		type: "bullet_list",
		attrs: { tight: false },
		content: decisionListNode.content,
	};
};

export default decisionList;