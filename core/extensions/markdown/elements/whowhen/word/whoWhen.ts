import { AddOptionsWord, WordInlineChild } from "../../../../wordExport/options/WordTypes";
import { createContent } from "@ext/wordExport/TextWordGenerator";
import { WordFontColors, WordFontStyles, NON_BREAKING_SPACE } from "@ext/wordExport/options/wordExportSettings";
import { Tag } from "@ext/markdown/core/render/logic/Markdoc";
import { getIconFromString } from "@ext/markdown/elements/icon/render/word/icon";

export const whoWordLayout: WordInlineChild = async ({ tag }) => {
	return await whoWhenWordLayout("/ ", tag, { style: WordFontStyles.who }, "circle-user");
};

export const whenWordLayout: WordInlineChild = async ({ tag }) => {
	return await whoWhenWordLayout("/ ", tag, { style: WordFontStyles.when }, "clock-4");
};

const whoWhenWordLayout = async (signBeforeText: string, tag: Tag, addOptions: AddOptionsWord, iconName: string) => {
	return [
		createContent(signBeforeText + NON_BREAKING_SPACE + NON_BREAKING_SPACE, {
			...addOptions,
			color: WordFontColors.whoWhen,
		}),
		await getIconFromString(iconName),
		createContent(NON_BREAKING_SPACE + tag.attributes.text),
	];
};
