import Language from "@ext/localization/core/model/Language";
import useLocalize from "@ext/localization/useLocalize/useBareLocalize";
import Path from "../logic/FileProvider/Path/Path";
import ApiUrlCreator from "./ApiServices/ApiUrlCreator";
import FetchService from "./ApiServices/FetchService";
import MimeTypes from "./ApiServices/Types/MimeTypes";

const downloadResource = async (apiUrlCreator: ApiUrlCreator, path: Path, lang: Language) => {
	const localizedErrorMessage = JSON.stringify({
		title: useLocalize("fileDownloadErrorTitle", lang),
		message: useLocalize("fileDownloadErrorMessage", lang),
	});

	const res = await FetchService.fetch(apiUrlCreator.getArticleResource(path.value, null), localizedErrorMessage);
	if (!res.ok) return;
	const extension = path.extension;
	downloadFile(await res.blob(), MimeTypes[extension] ?? extension, decodeURIComponent(path.nameWithExtension));
};

export const downloadFile = (fileData: any, mimeType: MimeTypes, fileName: string) => {
	const blob = new Blob([fileData], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};

export default downloadResource;
