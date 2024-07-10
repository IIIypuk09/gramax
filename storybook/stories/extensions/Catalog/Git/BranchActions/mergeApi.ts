import MergeConflictCaller from "@ext/git/actions/MergeConflictHandler/model/MergeConflictCaller";
import MergeData from "@ext/git/actions/MergeConflictHandler/model/MergeData";
import { MockedAPIEndpoint } from "../../../../../data/mock";
import { files as testMergeFiles } from "../MergeConflictHandler/data";

export const mergeData = { mergeFiles: testMergeFiles, reverseMerge: false, caller: MergeConflictCaller.Branch } as MergeData;

const mergeApi = [
	{
		path: "/api/versionControl/branch/mergeInto",
		delay: 1000,
		response: mergeData,
		// errorMessage: "mergeInto error",
	},
	{
		path: "/api/versionControl/mergeConflict/abort",
		delay: 1000,
		// errorMessage: "abort error",
	},
	{
		path: "/api/versionControl/mergeConflict/resolve",
		delay: 1000,
		errorMessage: "resolve error",
	},
	{
		path: "/api/versionControl/mergeConflict/getFiles",
		delay: 1000,
		response: mergeData,
		// errorMessage: "getFiles error",
	},
] as MockedAPIEndpoint[];

export default mergeApi;
