import type GitSourceData from "@ext/git/core/model/GitSourceData.schema";
import SourceType from "@ext/storage/logic/SourceDataProvider/model/SourceType";
import { WorkspaceConfig } from "@ext/workspace/WorkspaceConfig";

type SVG = string;

interface WorkspaceSource {
	type: SourceType;
	url: string;
	repos: string[];
}

interface WorkspaceStyle {
	logo?: SVG;
	logoDark?: SVG;
	css?: string;
}

interface UserSettingsWorkspace extends WorkspaceConfig {
	source: WorkspaceSource;
	style: WorkspaceStyle;
}

interface UserSettings {
	source: GitSourceData;
	workspace: UserSettingsWorkspace;
	from: string;
	isNotEditor?: boolean;
}

export default UserSettings;
