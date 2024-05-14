import LibGit2Commands from "@ext/git/core/GitCommands/LibGit2Commands";
import getGitError from "@ext/git/core/GitCommands/errors/logic/getGitError";
import { Caller } from "@ext/git/core/GitCommands/errors/model/Caller";
import GitErrorCode from "@ext/git/core/GitCommands/errors/model/GitErrorCode";
import GitCommandsConfig from "@ext/git/core/GitCommands/model/GitCommandsConfig";
import PersistentLogger from "@ext/loggers/PersistentLogger";
import Path from "../../../../logic/FileProvider/Path/Path";
import FileProvider from "../../../../logic/FileProvider/model/FileProvider";
import { VersionControlInfo } from "../../../VersionControl/model/VersionControlInfo";
import SourceData from "../../../storage/logic/SourceDataProvider/model/SourceData";
import Progress from "../../../storage/models/Progress";
import { GitBranch } from "../GitBranch/GitBranch";
import { GitStatus } from "../GitWatcher/model/GitStatus";
import GitSourceData from "../model/GitSourceData.schema";
import GitStash from "../model/GitStash";
import GitStorageData from "../model/GitStorageData";
import { GitVersion } from "../model/GitVersion";
import SubmoduleData from "../model/SubmoduleData";
import GitError from "./errors/GitError";
import GitCommandsModel from "./model/GitCommandsModel";

export class GitCommands {
	private _impl: GitCommandsModel;

	constructor(conf: GitCommandsConfig, private _fp: FileProvider, private _repoPath: Path) {
		this._impl = new LibGit2Commands(this._fp.rootPath.join(_repoPath));
	}

	inner() {
		return this._impl;
	}

	async hasInit(): Promise<boolean> {
		try {
			await this._impl.hasRemote();
		} catch {
			return false;
		}

		return true;
	}

	async hasRemote(): Promise<boolean> {
		if (!(await this.hasInit())) return false;
		return await this._impl.hasRemote();
	}

	async init(data: SourceData) {
		await this._logWrapper("init", "Initing repo", () => this._impl.init(data));
	}

	async addRemote(data: GitStorageData) {
		const url = `https://${data.source.domain}/${data.group}/${data.name}.git`;
		await this._logWrapper("addRemote", `Adding remote url: '${url}'`, async () => {
			await this._impl.addRemote(url);
			await this.push(data.source);
		});
	}

	async getCurrentBranch(data?: GitSourceData): Promise<GitBranch> {
		return await this._logWrapper("getCurrentBranch", "Getting current branch", async () => {
			try {
				return await this._impl.getCurrentBranch(data);
			} catch (err) {
				throw new GitError(
					GitErrorCode.CurrentBranchNotFoundError,
					err,
					{ repositoryPath: this._repoPath.value },
					"branch",
				);
			}
		});
	}

	async getCurrentBranchName(): Promise<string> {
		return await this._logWrapper("getCurrentBranchName", "Getting current branch name (string)", async () => {
			try {
				return await this._impl.getCurrentBranchName();
			} catch (err) {
				throw new GitError(
					GitErrorCode.CurrentBranchNotFoundError,
					err,
					{ repositoryPath: this._repoPath.value },
					"branch",
				);
			}
		});
	}

	async getAllBranches(): Promise<GitBranch[]> {
		return await this._logWrapper("getAllBranches", "Getting all branches", async () => {
			const branches = await this._impl.getAllBranches();
			return branches
				.filter((b) => !b.getData().name.includes("HEAD"))
				.sort(
					(a, b) =>
						new Date(b.getData().lastCommitModify).getTime() -
						new Date(a.getData().lastCommitModify).getTime(),
				);
		});
	}

	async getBranch(branchName: string): Promise<GitBranch> {
		return await this._logWrapper("getBranch", `Getting branch ${branchName} failed`, async () => {
			const branch = await this._impl.getBranch(branchName);
			if (!branch)
				throw new GitError(
					GitErrorCode.NotFoundError,
					null,
					{ repositoryPath: this._repoPath.value, what: branchName },
					"branch",
				);
			return branch;
		});
	}

	async getRemoteBranchName(name: string, data?: GitSourceData): Promise<string> {
		return await this._logWrapper("getRemoteBranchName", `Getting remote branch name for ${name}`, () =>
			this._impl.getRemoteBranchName(name, data),
		);
	}

	async getCommitHash(ref = "HEAD"): Promise<GitVersion> {
		return await this._logWrapper("getCommitHash", `Getting commit hash for ${ref}`, () =>
			this._impl.getCommitHash(ref),
		);
	}

	async getHeadCommit(ref: GitBranch | string = "HEAD"): Promise<GitVersion> {
		return await this._logWrapper("getHeadCommit", `Getting head commit for ref:${ref.toString()}`, async () => {
			try {
				return this._impl.getHeadCommit(ref.toString());
			} catch (e) {
				throw getGitError(
					e,
					{ repositoryPath: this._repoPath.value, branchName: ref.toString() },
					"resolveRef",
				);
			}
		});
	}

	async createNewBranch(newBranchName: string) {
		await this._logWrapper("createNewBranch", `Creatig new branch '${newBranchName}'`, async () => {
			try {
				await this._impl.newBranch(newBranchName);
			} catch (e) {
				throw getGitError(e, { repositoryPath: this._repoPath.value, branchName: newBranchName }, "branch");
			}
		});
	}

	async deleteBranch(branchName: GitBranch | string, remote?: boolean, data?: GitSourceData): Promise<void> {
		await this._logWrapper(
			"deleteBranch",
			`Deleteing ${remote ? "remote " : ""}branch '${branchName}'`,
			async () => {
				const currentBranch = await this.getCurrentBranch();
				if (
					branchName.toString() === currentBranch.toString() ||
					branchName.toString() === currentBranch.getData().remoteName
				) {
					throw new GitError(GitErrorCode.DeleteCurrentBranch, null, {
						repositoryPath: this._repoPath.value,
					});
				}
				try {
					await this._impl.deleteBranch(branchName.toString(), remote, data);
				} catch (e) {
					throw getGitError(
						e,
						{ repositoryPath: this._repoPath.value, branchName: branchName.toString() },
						"deleteBranch",
					);
				}
			},
		);
	}

	async checkout(
		ref: GitVersion | GitBranch | string,
		{ force, caller }: { force?: boolean; caller?: Caller } = {},
	): Promise<void> {
		await this._logWrapper("checkout", `Checkout to ref '${ref.toString()}'`, async () => {
			try {
				await this._impl.checkout(ref.toString(), force);
			} catch (e) {
				throw getGitError(e, { repositoryPath: this._repoPath.value }, caller ?? "checkout");
			}
		});
	}

	async clone(
		url: string,
		source: GitSourceData,
		branch?: string,
		onProgress?: (progress: Progress) => void,
	): Promise<void> {
		return this._logWrapper("clone", `Cloning url: '${url}', path: '${this._repoPath}'`, async () => {
			if ((await this._fp.exists(this._repoPath)) && (await this._fp.readdir(this._repoPath)).length > 0) {
				throw new GitError(
					GitErrorCode.AlreadyExistsError,
					null,
					{ repositoryPath: this._repoPath.value },
					"clone",
				);
			}
			try {
				await this._impl.clone(url.endsWith(".git") ? url : url + ".git", source, branch, onProgress);
			} catch (e) {
				await this._logWrapper("delete", `Deleting path: '${this._repoPath}'`, async () => {
					if (await this._fp.exists(this._repoPath)) await this._fp.delete(this._repoPath);
				});
				throw getGitError(e, { repositoryPath: this._repoPath.value }, "clone");
			}
		});
	}

	async add(filePaths?: Path[]): Promise<void> {
		return this._logWrapper(
			"add",
			`Adding ${filePaths ? `filePaths: '${filePaths.map((p) => p.value)}'` : "."}`,
			() => this._impl.add(filePaths),
		);
	}

	async hardReset(head?: GitVersion): Promise<void> {
		return await this._logWrapper("hardReset", `Hardresetting`, () => this._impl.resetHard(head));
	}

	async softReset(head?: GitVersion): Promise<void> {
		return await this._logWrapper("softReset", `Softresetting to '${head ?? "parent"}'`, () =>
			this._impl.resetSoft(head),
		);
	}

	async stash(data: SourceData): Promise<GitStash> {
		return await this._logWrapper("stash", "Stashing", async () => new GitStash(await this._impl.stash(data)));
	}

	async applyStash(data: SourceData, stashOid: GitStash): Promise<void> {
		return await this._logWrapper("applyStash", `Applying stash oid: '${stashOid.toString()}`, () =>
			this._impl.applyStash(data, stashOid.toString()),
		);
	}

	async deleteStash(stashHash: GitStash): Promise<void> {
		return await this._logWrapper("deleteStash", `Deleting stash stashOid: '${stashHash.toString()}'`, () =>
			this._impl.deleteStash(stashHash.toString()),
		);
	}

	async stashParent(stashOid: GitStash): Promise<GitVersion> {
		return await this._logWrapper("stashParent", `Getting stash parent stashOid: ${stashOid.toString()}`, () =>
			this._impl.stashParent(stashOid.toString()),
		);
	}

	async pull(data: GitSourceData) {
		return await this._logWrapper("pull", "Pulling", async () => {
			try {
				await this.fetch(data);

				const remoteBranchName =
					(await this.getRemoteName()) +
					"/" +
					(await this.getCurrentBranch()).getData().remoteName.replace("origin/", "");

				const stashOid = (await this.status()).length > 0 ? await this.stash(data) : undefined;
				await this.merge(data, remoteBranchName);
				if (stashOid) await this.applyStash(data, stashOid);
			} catch (e) {
				throw e.props ? e : getGitError(e, { repositoryPath: this._repoPath.value }, "pull");
			}
		});
	}

	async push(data: GitSourceData): Promise<void> {
		return await this._logWrapper("push", "Pushing", async () => {
			try {
				await this._impl.push(data);
			} catch (e) {
				throw getGitError(e, { repositoryPath: this._repoPath.value }, "push");
			}
		});
	}

	async fetch(data: GitSourceData): Promise<void> {
		return await this._logWrapper("fetch", "Fetching", async () => {
			const currentBranch = await this.getCurrentBranch(data);
			const isLocal = !currentBranch.getData().remoteName;
			if (isLocal) {
				this._log("Can't fetch on local branch", "fetch");
				return;
			}
			try {
				await this._impl.fetch(data);
			} catch (e) {
				throw getGitError(e, { repositoryPath: this._repoPath.value }, "fetch");
			}
		});
	}

	async merge(data: SourceData, theirs: string, abortOnConflict?: boolean): Promise<void> {
		const head = await this.getCurrentBranch();
		return await this._logWrapper(
			"merge",
			`Merging branch '${theirs}' into current branch: '${head.toString()}'`,
			async () => {
				try {
					await this._impl.merge(data, theirs, abortOnConflict);
				} catch (e) {
					throw getGitError(e, {
						repositoryPath: this._repoPath.value,
						ours: head.toString(),
						theirs,
					});
				}

				await this.checkout(head, { force: true });
			},
		);
	}

	async commit(message: string, data: SourceData, parents?: (string | GitBranch)[]): Promise<GitVersion> {
		return await this._logWrapper("commit", "Commiting", async () => {
			try {
				return await this._impl.commit(
					message,
					data,
					parents?.map((x) => x.toString()),
				);
			} catch (e) {
				throw getGitError(e, { repositoryPath: this._repoPath.value }, "commit");
			}
		});
	}

	async status(): Promise<GitStatus[]> {
		return await this._logWrapper("status", "Getting status", () => this._impl.status());
	}

	async fileStatus(filePath: Path): Promise<GitStatus> {
		return this._logWrapper("status file", `Getting file status ${filePath.value}`, () =>
			this._impl.fileStatus(filePath),
		);
	}

	async showFileContent(filePath: Path, hash?: GitVersion): Promise<string> {
		return await this._logWrapper(
			"showFileContent",
			`Getting file content for filePath: '${filePath}'`,
			async () => {
				try {
					return await this._impl.showFileContent(filePath, hash);
				} catch (e) {
					throw getGitError(e, { repositoryPath: this._repoPath.value });
				}
			},
		);
	}

	async getFileHistory(filePath: Path, count = 15): Promise<VersionControlInfo[]> {
		return await this._logWrapper("getFileHistory", `Getting file history for file: '${filePath.value}'`, () =>
			this._impl.getFileHistory(filePath, count),
		);
	}

	async getRemoteUrl(): Promise<string> {
		return await this._logWrapper("getRemoteUrl", "Getting remote url", () => this._impl.getRemoteUrl());
	}

	async getFixedSubmodulePaths(): Promise<Path[]> {
		return await this._logWrapper("getFixedSubmodulesPaths", "Fixing submodules paths", () =>
			this._impl.getFixedSubmodulePaths(),
		);
	}

	async getParentCommit(commitOid: GitVersion): Promise<GitVersion> {
		return await this._logWrapper(
			"getParentCommit",
			`Getting parent commit for commitOid: '${commitOid.toString()}'`,
			async () => {
				const oid = await this._impl.getParentCommit(commitOid.toString());
				return new GitVersion(oid);
			},
		);
	}

	async getSubmodulesData(): Promise<SubmoduleData[]> {
		return await this._logWrapper("getSubmodulesData", "Checking submodulesData", () =>
			this._impl.getSubmodulesData(),
		);
	}

	async restore(staged: boolean, filePaths: Path[]): Promise<void> {
		return await this._logWrapper(
			"restore",
			`Restore filePaths: '${filePaths.map((p) => p.value)}' staged:${staged}`,
			() => this._impl.restore(staged, filePaths),
		);
	}

	async diff(oldTree: GitVersion | GitBranch, newTree: GitVersion | GitBranch): Promise<GitStatus[]> {
		return await this._logWrapper(
			"diff",
			`Finding diffs for oldTree: '${oldTree.toString()}' newTree: '${newTree.toString()}'`,
			() => this._impl.diff(oldTree.toString(), newTree.toString()),
		);
	}
	getRemoteName(): Promise<string> {
		const REMOTE = "origin";
		return Promise.resolve(REMOTE);
	}

	private _log(msg: string, command: string, error?: Error) {
		if (error) PersistentLogger.err(msg, error, "git", { command, repo: this._repoPath });
		else PersistentLogger.info(msg, "git", { command, repo: this._repoPath.value });
	}

	private async _logWrapper<T>(command: string, msg: string, func: () => T | Promise<T>): Promise<T> {
		this._log(msg, command);
		try {
			return await func();
		} catch (e) {
			this._log(`${msg} failed`, command, e);
			throw e;
		}
	}
}

export default GitCommands;
