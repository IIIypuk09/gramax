import GoToArticle from "@components/Actions/GoToArticle";
import Checkbox from "@components/Atoms/Checkbox";
import Icon from "@components/Atoms/Icon";
import Sidebar from "@components/Layouts/Sidebar";
import { useState } from "react";
import DiffItem from "../../../../VersionControl/model/DiffItem";
import { FileStatus } from "../../../../Watchers/model/FileStatus";
import Discard from "../../Discard/Discard";
import SideBarResourceData from "../model/SideBarResourceData";
import DiffCounter from "./DiffCounter";
import SidebarArticleLink from "./SidebarArticleLink";

const SideBarArticleActions = ({
	checked,
	changeType,
	title,
	resources,
	filePath,
	addedCounter,
	removedCounter,
	onDiscard,
	onChangeCheckbox,
	goToActicleOnClick,
	logicPath,
}: {
	checked: boolean;
	changeType: FileStatus;
	title: string;
	resources: SideBarResourceData[];
	onDiscard: (paths: string[]) => void;
	onChangeCheckbox: (isChecked: boolean) => void;
	goToActicleOnClick: () => void;
	addedCounter: number;
	removedCounter: number;
	logicPath?: string;
} & Pick<DiffItem, "filePath">) => {
	const [hover, setHover] = useState(false);

	return (
		<div
			className="sidebar-article-actions"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<div style={{ padding: "1rem" }}>
				<Sidebar
					title={title ? title : "..."}
					leftActions={[
						<Checkbox
							key={0}
							checked={checked}
							onChange={(isChecked) => {
								onChangeCheckbox(isChecked);
							}}
						/>,
					]}
					rightActions={
						hover
							? [
									logicPath ? (
										<GoToArticle
											key={1}
											distance={5}
											trigger={
												<Icon
													code="arrow-up-right-from-square"
													style={{ fontSize: "13px", fontWeight: 300 }}
												/>
											}
											href={logicPath}
											onClick={goToActicleOnClick}
										/>
									) : null,
									<Discard
										key={0}
										paths={[
											filePath.path,
											filePath.oldPath,
											...resources.map((r) => r.filePath.path),
										].filter((x) => x)}
										onDiscard={onDiscard}
									/>,
							  ]
							: [<DiffCounter key={1} added={addedCounter} removed={removedCounter} />]
					}
				/>
				<SidebarArticleLink filePath={filePath} type={changeType} />
			</div>
		</div>
	);
};

export default SideBarArticleActions;
