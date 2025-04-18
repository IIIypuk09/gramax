import SpinnerLoader from "@components/Atoms/SpinnerLoader";
import LogsLayout from "@components/Layouts/LogsLayout";
import ModalLayout from "@components/Layouts/Modal";
import CatalogPropsService from "@core-ui/ContextServices/CatalogProps";
import { useRouter } from "@core/Api/useRouter";
import ErrorConfirmService from "@ext/errorHandlers/client/ErrorConfirmService";
import t from "@ext/localization/locale/translate";
import { CSSProperties, useState } from "react";
import FetchService from "../../../../../ui-logic/ApiServices/FetchService";
import ApiUrlCreatorService from "../../../../../ui-logic/ContextServices/ApiUrlCreator";
import ButtonLink from "@components/Molecules/ButtonLink";

const DeleteCatalog = ({ style }: { style?: CSSProperties }) => {
	const catalogProps = CatalogPropsService.value;
	const apiUrlCreator = ApiUrlCreatorService.value;

	const router = useRouter();
	const [deleteProcess, setDeleteProcess] = useState(false);
	const deleteText = t(catalogProps.sourceName ? "delete-storage-catalog" : "delete-local-catalog");

	const deleteCatalog = async () => {
		if (!(await confirm(deleteText))) return;
		setDeleteProcess(true);
		ErrorConfirmService.stop();
		const res = await FetchService.fetch(apiUrlCreator.removeCatalog());
		ErrorConfirmService.start();
		if (!res.ok) return;
		setDeleteProcess(false);
		router.pushPath("/");
	};

	return (
		<>
			<ModalLayout isOpen={deleteProcess}>
				<LogsLayout style={{ overflow: "hidden" }}>
					<SpinnerLoader fullScreen />
				</LogsLayout>
			</ModalLayout>
			<ButtonLink style={style} onClick={deleteCatalog} iconCode="trash" text={t("catalog.delete")} />
		</>
	);
};

export default DeleteCatalog;
