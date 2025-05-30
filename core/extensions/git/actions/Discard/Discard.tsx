import ArticleUpdaterService from "@components/Article/ArticleUpdater/ArticleUpdaterService";
import Icon from "@components/Atoms/Icon";
import FetchService from "@core-ui/ApiServices/FetchService";
import MimeTypes from "@core-ui/ApiServices/Types/MimeTypes";
import ApiUrlCreatorService from "@core-ui/ContextServices/ApiUrlCreator";
import t from "@ext/localization/locale/translate";
// import customConfirm from "@core-ui/CustomConfirm";

const Discard = ({
	paths,
	onEndDiscard,
	onStartDiscard,
	onDiscardError,
	selectedText = false,
	discardAll = false,
}: {
	paths: string[];
	onEndDiscard?: (paths: string[]) => void;
	onStartDiscard?: (paths: string[]) => void;
	onDiscardError?: () => void;
	selectedText?: boolean;
	discardAll?: boolean;
}) => {
	const confirmText = t("git.discard.seletected-confirm");
	const apiUrlCreator = ApiUrlCreatorService.value;

	const currentOnDiscard = async () => {
		onStartDiscard?.(paths);
		const discardUrl = apiUrlCreator.getVersionControlDiscardUrl();
		const response = await FetchService.fetch(discardUrl, JSON.stringify(paths), MimeTypes.json);
		if (!response.ok) return onDiscardError?.();
		onEndDiscard?.(paths);
	};

	return (
		<span
			onClick={async () => {
				ArticleUpdaterService.stopLoadingAfterFocus();
				if (await confirm(confirmText)) await currentOnDiscard();
			}}
			style={{ height: "100%" }}
		>
			<a>
				<Icon
					tooltipContent={t("git.discard.select-all-arrow-tooltip")}
					code={discardAll ? "reply-all" : "reply"}
					style={{ fontSize: "13px", fontWeight: 300 }}
				/>
			</a>
		</span>
	);
};

export default Discard;
