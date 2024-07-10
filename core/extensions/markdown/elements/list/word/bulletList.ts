import { WordBlockChild } from "../../../../wordExport/options/WordTypes";
import { wordNestedListMaxLevel } from "./WordListLevel";
import { WordListRenderer } from "./WordListRenderer";

export const ulListWordLayout: WordBlockChild = async ({ state, tag, addOptions }) => {
	const reference = "bulletList";
	const level = Math.min(tag.attributes.depth ?? 0, wordNestedListMaxLevel);
	const numbering = { reference, level };

	return await WordListRenderer.renderList(state, tag, { numbering, ...addOptions });
};
