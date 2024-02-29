import Button from "@components/Atoms/Button/Button";
import Input from "@components/Atoms/Input";
import SpinnerLoader from "@components/Atoms/SpinnerLoader";
import FormStyle from "@components/Form/FormStyle";
import ModalLayout from "@components/Layouts/Modal";
import ModalLayoutLight from "@components/Layouts/ModalLayoutLight";
import { ButtonItem, ListItem } from "@components/List/Item";
import ListLayout from "@components/List/ListLayout";
import FetchService from "@core-ui/ApiServices/FetchService";
import ApiUrlCreatorService from "@core-ui/ContextServices/ApiUrlCreator";
import PageDataContextService from "@core-ui/ContextServices/PageDataContext";
import IsReadOnlyHOC from "@core-ui/HigherOrderComponent/IsReadOnlyHOC";
import AddNewBranchListItem from "@ext/git/actions/Branch/components/AddNewBranchListItem";
import BranchSideBar from "@ext/git/actions/Branch/components/BranchSideBar";
import MergeBranches from "@ext/git/actions/Branch/components/MergeBranches";
import getNewBranchNameErrorLocalization from "@ext/git/actions/Branch/components/logic/getNewBranchNameErrorLocalization";
import validateBranchError from "@ext/git/actions/Branch/components/logic/validateBranchError";
import GitBranchData from "@ext/git/core/GitBranch/model/GitBranchData";
import useLocalize from "@ext/localization/useLocalize";
import { useEffect, useRef, useState } from "react";

interface BranchActionsProps {
	currentBranch: string;
	trigger: JSX.Element;
	onNewBranch?: () => void;
	onStopMerge?: (isError: boolean) => void;
}

const BranchActions = (props: BranchActionsProps) => {
	const { currentBranch, trigger, onNewBranch = () => {}, onStopMerge = () => {} } = props;
	const lang = PageDataContextService.value.lang;
	const apiUrlCreator = ApiUrlCreatorService.value;
	const readOnly = PageDataContextService.value.conf.isReadOnly;
	const addNewBranchText = useLocalize("addNewBranch");

	const [displayedBranch, setDisplayedBranch] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const [initNewBranchName, setInitNewBranchName] = useState("");
	const [isInitNewBranch, setIsInitNewBranch] = useState(false);
	const [isInitNewBranchNameExist, setIsInitNewBranchNameExist] = useState(false);
	const [apiProcess, setApiProcess] = useState(false);
	const initNewBranchInputRef = useRef<HTMLInputElement>(null);

	const [isNewBranch, setIsNewBranch] = useState(false);
	const [branches, setBranches] = useState<GitBranchData[]>([]);

	const [newBranches, setNewBranches] = useState<GitBranchData[]>([]);

	const [branchToMergeInTo, setBranchToMergeInTo] = useState<string>(null);
	const [deleteAfterMerge, setDeleteAfterMerge] = useState<boolean>(null);
	const [canMerge, setCanMerge] = useState<boolean>(null);
	const [isLoadingData, setIsLoadingData] = useState(false);

	const [newBranchValidationError, setNewBranchValidationError] = useState<string>("");

	const canInitNewBranch =
		isInitNewBranch &&
		!isNewBranch &&
		initNewBranchName &&
		!isInitNewBranchNameExist &&
		!apiProcess &&
		!newBranchValidationError;

	const canSwitchBranch =
		!isInitNewBranch && displayedBranch && !isNewBranch && currentBranch !== displayedBranch && !apiProcess;

	const getNewBranches = async () => {
		setIsLoadingData(true);
		const getBranchUrl = apiUrlCreator.getVersionControlResetBranchesUrl();
		const response = await FetchService.fetch<GitBranchData[]>(getBranchUrl);
		if (!response.ok) {
			setIsOpen(false);
			return;
		}
		setNewBranches(await response.json());
		setIsLoadingData(false);
	};

	const validateBranchName = (value: string): string => {
		const branchExists = [currentBranch, ...branches.map((otherBranch) => otherBranch.name)];
		const errorResult = validateBranchError(value, branchExists);
		const str = getNewBranchNameErrorLocalization(errorResult, lang);

		return str;
	};

	const switchBranch = async () => {
		if (!displayedBranch) return;
		const newBranchUrl = apiUrlCreator.getVersionControlCheckoutBranchUrl(displayedBranch);
		setApiProcess(true);
		const response = await FetchService.fetch(newBranchUrl);
		if (!response.ok) {
			setIsOpen(false);
			setApiProcess(false);
			return;
		}
		onNewBranch();
		setIsNewBranch(true);
		setIsOpen(false);
		setApiProcess(false);
	};

	const initNewBranch = async () => {
		const initNewBranchUrl = apiUrlCreator.getVersionControlCreateNewBranchUrl(initNewBranchName);
		setApiProcess(true);
		const response = await FetchService.fetch(initNewBranchUrl);
		if (!response.ok) {
			setApiProcess(false);
			return;
		}
		onNewBranch();
		setIsNewBranch(true);
		setIsOpen(false);
		setApiProcess(false);
	};

	const mergeBranches = async () => {
		const mergeIntoUrl = apiUrlCreator.mergeInto(branchToMergeInTo, deleteAfterMerge);
		setApiProcess(true);
		const res = await FetchService.fetch(mergeIntoUrl);
		if (!res.ok) {
			setApiProcess(false);
			onStopMerge(true);
			setIsOpen(false);
			return;
		}
		onStopMerge(false);
		setIsOpen(false);
		setApiProcess(false);
	};

	const onCmdEnter = async () => {
		let action: () => Promise<void>;
		if (canInitNewBranch) action = initNewBranch;
		else if (canSwitchBranch) action = switchBranch;
		if (!action && canMerge) action = mergeBranches;
		if (!action) return;
		if ((canInitNewBranch || canSwitchBranch) && canMerge) return;
		await action();
	};

	useEffect(() => {
		setIsInitNewBranchNameExist(
			[currentBranch, ...branches.map((otherBranch) => otherBranch.name)].includes(initNewBranchName),
		);
	}, [initNewBranchName]);

	useEffect(() => {
		if (isInitNewBranch) initNewBranchInputRef.current.focus();
	}, [isInitNewBranch]);

	const areNewBranchesLoading = newBranches.length === 0;

	useEffect(() => {
		if (areNewBranchesLoading) return;
		if (isInitNewBranch) initNewBranchInputRef.current.focus();
	}, [areNewBranchesLoading]);

	useEffect(() => {
		if (!newBranches) return;
		setBranches(newBranches.filter((b) => b.name != currentBranch));
	}, [newBranches]);

	const addNewBranchListItem: ButtonItem[] = !readOnly
		? [
				{
					element: <AddNewBranchListItem addNewBranchText={addNewBranchText} />,
					labelField: addNewBranchText,
					onCLick: () => {
						setIsInitNewBranch(true);
					},
				},
		  ]
		: undefined;

	const branchListItems: ListItem[] = [
		...branches.map((b) => {
			return {
				element: (
					<BranchSideBar
						name={b.name}
						iconCode={b.remoteName ? "cloud" : "desktop"}
						tooltipContent={b.remoteName ? useLocalize("remote", lang) : useLocalize("local", lang)}
						data={{ lastCommitAuthor: b.lastCommitAuthor, lastCommitModify: b.lastCommitModify }}
					/>
				),
				labelField: b.name,
			};
		}),
	];

	const modalOnCloseHandler = () => {
		setIsInitNewBranch(false);
		setDisplayedBranch("");
		setIsNewBranch(false);
		setNewBranches([]);
		setApiProcess(false);
		setIsOpen(false);
		setInitNewBranchName("");
		setNewBranchValidationError(null);
	};

	const modalOnOpenHandler = () => {
		setIsOpen(true);
		void getNewBranches();
	};

	if (apiProcess) {
		return (
			<ModalLayout
				trigger={trigger}
				isOpen={isOpen}
				onOpen={modalOnOpenHandler}
				onClose={modalOnCloseHandler}
				onCmdEnter={onCmdEnter}
				setGlobalsStyles
			>
				<ModalLayoutLight>
					<FormStyle>
						<>
							<legend>{useLocalize("loading2", lang)}</legend>
							<SpinnerLoader fullScreen />
						</>
					</FormStyle>
				</ModalLayoutLight>
			</ModalLayout>
		);
	}

	return (
		<ModalLayout
			trigger={trigger}
			isOpen={isOpen}
			onOpen={modalOnOpenHandler}
			onClose={modalOnCloseHandler}
			onCmdEnter={onCmdEnter}
			setGlobalsStyles
		>
			<ModalLayoutLight>
				<FormStyle>
					<>
						<legend>{useLocalize("changeBranch", lang)}</legend>
						<div className="form-group field field-string">
							<ListLayout
								openByDefault
								selectAllOnFocus
								isLoadingData={isLoadingData}
								onSearchChange={() => {
									setIsInitNewBranch(false);
									setDisplayedBranch("");
								}}
								onSearchClick={() => {
									if (isInitNewBranch) setIsInitNewBranch(false);
								}}
								item={isInitNewBranch ? "Добавить новую ветку" : undefined}
								buttons={addNewBranchListItem}
								items={branchListItems}
								onItemClick={(elem) => {
									setDisplayedBranch(elem ?? currentBranch);
								}}
								placeholder={useLocalize("findBranch", lang)}
							/>
						</div>
						{isInitNewBranch && (
							<div className="init-new-branch-input form-group">
								<Input
									isCode
									errorText={newBranchValidationError}
									type="text"
									ref={initNewBranchInputRef}
									style={{ pointerEvents: isNewBranch ? "none" : "auto" }}
									placeholder={useLocalize("enterBranchName", lang)}
									onChange={(e) => {
										const validateBranchNameValue = validateBranchName(e.currentTarget.value);
										setNewBranchValidationError(validateBranchNameValue);
										setInitNewBranchName(e.currentTarget.value);
									}}
								/>
							</div>
						)}
						<div className="buttons">
							<Button
								disabled={isInitNewBranch ? !canInitNewBranch : !canSwitchBranch}
								onClick={isInitNewBranch ? initNewBranch : switchBranch}
							>
								{useLocalize(isInitNewBranch ? "add" : "switch", lang)}
							</Button>
						</div>

						<IsReadOnlyHOC>
							<MergeBranches
								onClick={mergeBranches}
								onCanMergeChange={(value) => setCanMerge(value)}
								onBranchToMergeInToChange={(value) => setBranchToMergeInTo(value)}
								onDeleteAfterMergeChange={(value) => setDeleteAfterMerge(value)}
								currentBranch={currentBranch}
								isLoadingData={isLoadingData}
								branches={branchListItems}
							/>
						</IsReadOnlyHOC>
					</>
				</FormStyle>
			</ModalLayoutLight>
		</ModalLayout>
	);
};

export default BranchActions;
