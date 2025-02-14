import t from "@ext/localization/locale/translate";
import { GitErrorLocalization } from "./model/GitErrorLocalization";

const gitErrorLocalization: GitErrorLocalization = {
	CheckoutConflictError: (props) =>
		props?.caller == "pull"
			? { message: t("git.sync.error.local-changes-present") }
			: { message: t("git.sync.error.local-changes-present") },
	CheckoutSubmoduleError: (props) => ({
		message: t("git.checkout.submodule.error").replace("{{path}}", props.error.props.submodulePath),
	}),
	DeleteCurrentBranch: () => ({ message: t("git.branch.error.deleting-head-branch") }),
	WorkingDirNotEmpty: () => ({
		message: t("git.merge.error.workdir-not-empty.body"),
		title: t("git.merge.error.workdir-not-empty.title"),
	}),
	PushRejectedError: (props) =>
		props.error?.data?.reason === "not-fast-forward"
			? {
					message: t("git.publish.error.non-fast-forward.body"),
					title: t("git.publish.error.non-fast-forward.title"),
			  }
			: { message: `${t("git.publish.error.unknown")} ${props.error.message}` },
	GitPushError: (props) => {
		if (props.caller === "deleteBranch") {
			if (props.error.props.fromMerge) {
				return {
					message: t("git.branch.error.cannot-delete-protected").replace(
						"{{branch}}",
						props.error.props.branchName,
					),
					showMessage: true,
				};
			}
			return { message: t("git.branch.error.cannot-delete").replace("{{branch}}", props.error.props.branchName) };
		}
		return { message: t("git.publish.error.protected"), showMessage: true };
	},
	CurrentBranchNotFoundError: () => ({ message: t("git.branch.error.not-found.local") }),
	RemoteNotFoundMessageError: (props) => ({
		message: t("git.branch.error.not-found.remote").replace("{{branch}}", props.error?.props?.branchName),
	}),
	MergeNotSupportedError: () => ({ message: t("git.merge.error.not-supported") }),
	MergeConflictError: () => ({ message: t("git.merge.error.conflict-occured") }),
	MergeError: () => ({ message: t("git.merge.error.generic") }),
	CantGetConflictedFiles: () => ({ message: t("git.merge.error.conflicts-not-found") }),
	AlreadyExistsError: (props) => {
		if (props.caller === "branch")
			return { message: t("git.branch.error.already-exist").replace("{{branch}}", props.error.props.branchName) };
		if (props.caller === "clone")
			return {
				message: t("git.clone.error.already-exist").replace("{{path}}", props.error?.props?.repositoryPath),
			};
	},
	HttpError: (props) => {
		const text = props.error.data?.statusCode ?? ("" as string);
		if (!(text.includes("status") && text.includes("code")))
			return { message: t("git.error.http").replace("{{status}}", text) };
		if (text.includes("401") || text.includes("403")) {
			if (props.caller === "pull") return { message: t("git.sync.error.no-permission") };
			if (props.caller === "push") return { message: t("git.publish.error.no-permission") };
		}
		return { message: t("git.error.http").replace("{{status}}", text) };
	},
	NotFoundError: (props) => {
		switch (props.caller) {
			case "resolveRef":
				return { message: t("git.sync.error.local-changes-present") };
			case "pull":
				return { message: t("git.error.not-found.remote-branch").replace("{{what}}", props.error.data.what) };
			case "checkout":
				return { message: t("git.error.not-found.branch").replace("{{what}}", props.error.data.what) };
			case "branch":
				return { message: t("git.error.not-found.branch").replace("{{what}}", props.error.props.what) };
			case "readBlob":
				return { message: t("git.error.not-found.blob").replace("{{path}}", props.error.props.filePath) };
			default:
				return { message: `${t("git.error.not-found.generic")} ${props.error.message}` };
		}
	},
	CloneError: () => ({ message: t("git.clone.error.generic") }),
	NetworkConntectionError: () => ({ message: t("git.error.network.message"), title: t("git.error.network.title") }),
	FileNotFoundError: () => ({ message: t("not-found") }),
};

export default gitErrorLocalization;
