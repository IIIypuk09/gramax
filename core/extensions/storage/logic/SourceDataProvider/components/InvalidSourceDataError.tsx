import PageDataContextService from "@core-ui/ContextServices/PageDataContext";
import InfoModalForm from "@ext/errorHandlers/client/components/ErrorForm";
import GetErrorComponent from "@ext/errorHandlers/logic/GetErrorComponent";
import t from "@ext/localization/locale/translate";
import useSourceData from "@ext/storage/components/useSourceData";
import { useOpenRestoreSourceTokenModal } from "@ext/storage/logic/SourceDataProvider/components/useOpenRestoreSourceTokenModal";
import getStorageNameByData from "@ext/storage/logic/utils/getStorageNameByData";
import { ComponentProps, useEffect } from "react";

const InvalidSourceDataError = ({ error, onCancelClick }: ComponentProps<typeof GetErrorComponent>) => {
	const pageData = PageDataContextService.value;

	useEffect(() => {
		const sourceIndex = pageData.sourceDatas.findIndex((s) => getStorageNameByData(s) === error.props?.sourceName);
		if (sourceIndex !== -1) {
			pageData.sourceDatas[sourceIndex].isInvalid = true;
			PageDataContextService.value = { ...pageData };
		}
	}, []);

	const source = useSourceData(error.props?.sourceName as string);
	const openRestoreSourceModal = useOpenRestoreSourceTokenModal(source);

	return (
		<>
			<InfoModalForm
				onCancelClick={onCancelClick}
				title={t("storage-not-connected")}
				icon={{ code: "key-round" }}
				actionButton={
					source
						? {
								text: t("connect-storage"),
								onClick: () => {
									onCancelClick?.();
									openRestoreSourceModal();
								},
						  }
						: null
				}
				closeButton={{ text: t("close") }}
			>
				<div className="article">
					<p>{t("git.source.error.invalid-credentials.desc")}</p>
				</div>
			</InfoModalForm>
		</>
	);
};

export default InvalidSourceDataError;
