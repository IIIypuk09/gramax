import { getExecutingEnvironment } from "@app/resolveModule/env";
import resolveModule from "@app/resolveModule/frontend";
import Button from "@components/Atoms/Button/Button";
import { ButtonStyle } from "@components/Atoms/Button/ButtonStyle";
import lucideIconList, { iconFilter, toListItem } from "@components/Atoms/Icon/lucideIconList";
import Input from "@components/Atoms/Input";
import SpinnerLoader from "@components/Atoms/SpinnerLoader";
import FormStyle from "@components/Form/FormStyle";
import ModalLayoutLight from "@components/Layouts/ModalLayoutLight";
import ListLayout from "@components/List/ListLayout";
import FetchService from "@core-ui/ApiServices/FetchService";
import ApiUrlCreatorService from "@core-ui/ContextServices/ApiUrlCreator";
import { clearData } from "@core-ui/ContextServices/RefreshPageContext";
import WorkspaceService from "@core-ui/ContextServices/Workspace";
import { uniqueName } from "@core/utils/uniqueName";
import styled from "@emotion/styled";
import useLocalize from "@ext/localization/useLocalize";
import { ClientWorkspaceConfig } from "@ext/workspace/WorkspaceConfig";
import { useMemo, useState } from "react";

const WorkspaceForm = ({
	onSave,
	workspace,
	create = false,
	className,
}: {
	create?: boolean;
	workspace?: ClientWorkspaceConfig;
	onSave?: () => void;
	className?: string;
}) => {
	const apiUrlCreator = ApiUrlCreatorService.value;

	const askPath = getExecutingEnvironment() == "tauri";

	const workspaces = WorkspaceService.workspaces();
	const pathPlaceholder = WorkspaceService.defaultPath();

	const [deleteInProgress, setDeleteInProgress] = useState(false);

	const defaultPath = useMemo(
		() =>
			uniqueName(
				pathPlaceholder + "/default",
				workspaces.map((w) => w.path),
			),
		[workspaces],
	);

	const [props, setProps] = useState<ClientWorkspaceConfig>(
		workspace ? { ...workspace } : { name: "", path: defaultPath, icon: "" },
	);

	const isNameUnique = useMemo(
		() =>
			props.name?.length > 0 &&
			(create
				? !workspaces.find((w) => w.name == props.name)
				: !workspaces.find((w) => w.path != props.path && w.name == props.name)),
		[props.name],
	);

	const isPathValid = useMemo(
		() =>
			create ? props.path?.length > 0 && !workspaces.find((w) => w.path == props.path) : props.path?.length > 0,
		[props.path],
	);

	const canSave = isNameUnique && isPathValid && !deleteInProgress;

	const saveWorkspace = async () => {
		if (!canSave) return;

		if (!askPath && create)
			props.path = uniqueName(
				pathPlaceholder + "/workspace",
				workspaces.map((w) => w.path),
			);

		clearData();
		await FetchService.fetch(
			create ? apiUrlCreator.createWorkspace() : apiUrlCreator.editWorkspace(),
			JSON.stringify(props),
		);
		await refreshPage();
	};

	const removeTranslated = useLocalize(
		getExecutingEnvironment() == "browser" ? "workspaceDeleteBrowser" : "workspaceDelete",
	);

	const removeWorkspace = async () => {
		if (!(await confirm(removeTranslated))) return;
		setDeleteInProgress(true);
		onSave?.();
		clearData();
		await FetchService.fetch(apiUrlCreator.removeWorkspace(workspace.path));
		await refreshPage();
	};

	return (
		<ModalLayoutLight className={className}>
			<FormStyle formDirection="column">
				<>
					<legend>{useLocalize("editWorkspaceTitle")}</legend>
					<fieldset>
						<div className="form-group">
							<div className="field field-string row">
								<label className="control-label">
									{useLocalize("name")}
									<span className="required">*</span>
								</label>
								<div className={`input-lable`}>
									<Input
										showErrorText={!isNameUnique}
										errorText={!isNameUnique ? useLocalize("cantBeSameName") : null}
										isCode
										placeholder="Gramax"
										value={props.name}
										maxLength={30}
										onChange={(e) => {
											props.name = e.target.value ?? "";
											setProps({ ...props });
										}}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="field field-string row">
								<label className="control-label">{useLocalize("icon")}</label>
								<div className={`input-lable`} style={{ display: "flex", gap: "1rem" }}>
									<ListLayout
										placeholder={useLocalize("icon")}
										items={lucideIconList}
										filterItems={iconFilter([], true)}
										item={toListItem({ code: props.icon ?? "" })}
										onItemClick={(value) => {
											props.icon = value;
											setProps({ ...props });
										}}
									/>
								</div>
							</div>
						</div>
						{askPath && (
							<div className="form-group">
								<div className="field field-string row">
									<label className="control-label">
										{useLocalize("workingDirectory")}
										<span className="required">*</span>
									</label>
									<div className={`input-lable `} style={{ display: "flex", gap: "1rem" }}>
										<Input
											showErrorText={!isPathValid}
											errorText={!isPathValid ? useLocalize("cantBeSamePath") : null}
											isCode
											readOnly
											placeholder={pathPlaceholder}
											value={props.path}
											onChange={(e) => {
												props.path = e.target.value ?? "";
												setProps({ ...props });
											}}
										/>
										{create && (
											<Button
												onClick={async () => {
													props.path = (await resolveModule("openDirectory")()) || props.path;
													setProps({ ...props });
												}}
											>
												{useLocalize("open")}
											</Button>
										)}
									</div>
								</div>
								<div className={`input-lable-description `}>
									<div />
									<div className="article">
										<p>{useLocalize("workspacePathDesc")}</p>
									</div>
								</div>
							</div>
						)}
					</fieldset>
					<div className="buttons">
						{!create && workspaces.length > 1 && (
							<div className="left-buttons">
								<Button
									disabled={deleteInProgress}
									buttonStyle={ButtonStyle.underline}
									onClick={removeWorkspace}
								>
									{deleteInProgress && (
										<span className="spinner-container">
											<SpinnerLoader height={15} width={15} fullScreen />
										</span>
									)}
									<span>{useLocalize("delete")}</span>
								</Button>
							</div>
						)}
						<Button
							buttonStyle={ButtonStyle.default}
							disabled={!canSave}
							onClick={async () => {
								onSave?.();
								await saveWorkspace();
							}}
						>
							<span>{useLocalize("save")}</span>
						</Button>
					</div>
				</>
			</FormStyle>
		</ModalLayoutLight>
	);
};

export default styled(WorkspaceForm)`
	max-width: 50rem;

	.spinner-container {
		margin-right: 0.1rem;
	}
`;
