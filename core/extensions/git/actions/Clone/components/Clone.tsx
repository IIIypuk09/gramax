import Button from "@components/Atoms/Button/Button";
import FormStyle from "@components/Form/FormStyle";
import ModalLayout from "@components/Layouts/Modal";
import ModalLayoutLight from "@components/Layouts/ModalLayoutLight";
import { useRouter } from "@core/Api/useRouter";
import CloneProgressbar from "@ext/git/actions/Clone/components/CloneProgressbar";
import { useMemo, useState } from "react";
import useLocalize from "../../../../localization/useLocalize";
import SelectStorageDataForm from "../../../../storage/components/SelectStorageDataForm";
import StorageData from "../../../../storage/models/StorageData";
import SpinnerLoader from "@components/Atoms/SpinnerLoader";
import UnsupportedElementsModal from "@ext/confluence/components/UnsupportedElementsModal";
import FetchService from "@core-ui/ApiServices/FetchService";
import UnsupportedElements from "@ext/confluence/actions/Import/model/UnsupportedElements";
import ApiUrlCreatorService from "@core-ui/ContextServices/ApiUrlCreator";

enum CloneStage {
	AskForStorage,
	LoadUnsupportedElements,
	AskToImport,
	Cloning,
}

const LoadingLayout = ({ title, children }: { title?: string; children: React.ReactNode }) => (
	<FormStyle>
		<>
			<legend>{title || useLocalize("loading2")}</legend>
			{children}
		</>
	</FormStyle>
);

const SelectStorageForm = (props: {
	onSetStorage: (data: StorageData) => void;
	startClone: () => void;
	disabled: boolean;
	forClone?: boolean;
	title: string;
	buttonText: string;
	loadUnsupportedElements: () => void;
}) => (
	<SelectStorageDataForm forClone={props.forClone} onChange={props.onSetStorage} title={props.title}>
		<div className="buttons">
			<Button
				disabled={props.disabled}
				onClick={props.forClone ? props.startClone : props.loadUnsupportedElements}
			>
				{props.buttonText}
			</Button>
		</div>
	</SelectStorageDataForm>
);

const Clone = ({ trigger, forClone }: { trigger: JSX.Element; forClone?: boolean }) => {
	const router = useRouter();
	const [stage, setStage] = useState(CloneStage.AskForStorage);
	const [isOpen, setIsOpen] = useState(false);
	const [storageData, setStorageData] = useState<StorageData>(null);
	const [unsupportedElements, setUnsupportedElements] = useState<UnsupportedElements[]>([]);
	const apiUrlCreator = ApiUrlCreatorService.value;

	const disable = !storageData || Object.values(storageData).some((v) => !v);

	const closeForm = () => {
		setStage(CloneStage.AskForStorage);
		setIsOpen(false);
		setStorageData(null);
	};

	const startClone = () => {
		setStage(CloneStage.Cloning);
	};

	const localizedImport = useLocalize("import");
	const localizedCatalog2 = useLocalize("catalog2");
	const localizedLoad = useLocalize("load");
	const localizedExisting = useLocalize("existing");

	const storageConfig = useMemo(
		() => ({
			import: {
				title: `${localizedImport} ${localizedCatalog2}`,
				buttonText: localizedImport,
			},
			clone: {
				title: `${localizedLoad} ${localizedExisting} ${localizedCatalog2}`,
				buttonText: localizedLoad,
			},
		}),
		[],
	);

	const mode = forClone ? storageConfig.clone : storageConfig.import;

	const loadUnsupportedElements = async () => {
		setStage(CloneStage.LoadUnsupportedElements);
		const res = await FetchService.fetch<UnsupportedElements[]>(
			apiUrlCreator.getUnsupportedElementsUrl(storageData.name),
			JSON.stringify(storageData),
		);
		const elements = await res.json();
		if (!elements?.length) {
			startClone();
			return;
		}
		setUnsupportedElements(elements);
		setStage(CloneStage.AskToImport);
	};

	return (
		<>
			<ModalLayout
				isOpen={isOpen}
				onOpen={() => setIsOpen(true)}
				onClose={closeForm}
				onCmdEnter={startClone}
				trigger={<div>{trigger}</div>}
			>
				<ModalLayoutLight>
					{stage === CloneStage.AskForStorage && (
						<SelectStorageForm
							onSetStorage={setStorageData}
							disabled={disable}
							forClone={forClone}
							title={mode.title}
							buttonText={mode.buttonText}
							startClone={startClone}
							loadUnsupportedElements={loadUnsupportedElements}
						/>
					)}

					{stage === CloneStage.LoadUnsupportedElements && (
						<LoadingLayout title={useLocalize("checking") + "..."}>
							<SpinnerLoader height={100} width={100} fullScreen />
						</LoadingLayout>
					)}

					{stage === CloneStage.AskToImport && (
						<UnsupportedElementsModal
							startClone={startClone}
							onCancelClick={() => setStage(CloneStage.AskForStorage)}
							unsupportedNodes={unsupportedElements}
						/>
					)}

					{stage === CloneStage.Cloning && (
						<LoadingLayout>
							<CloneProgressbar
								triggerClone={true}
								storageData={storageData}
								skipCheck={true}
								onFinish={(path) => {
									router.pushPath(path);
								}}
								onError={closeForm}
							/>
						</LoadingLayout>
					)}
				</ModalLayoutLight>
			</ModalLayout>
		</>
	);
};

export default Clone;
