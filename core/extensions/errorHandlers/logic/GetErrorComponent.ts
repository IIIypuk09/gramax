import getStorageErrors from "@ext/storage/components/getStorageErrors";
import { ComponentProps, ReactNode } from "react";
import getFileStructueErrors from "../../../logic/FileStructue/error/logic/getFileStructueErrors";
import getGitErrors from "../../git/error/getGitError";
import DefaultErrorComponent from "../client/components/DefaultError";
import DefaultError from "./DefaultError";

const getComponents = (): {
	[key: string]: (args: ComponentProps<typeof GetErrorComponent>) => ReactNode;
} => ({
	...getFileStructueErrors(),
	...getGitErrors(),
	...getStorageErrors(),
});

const GetErrorComponent = (args: { error: DefaultError; onCancelClick: () => void }): ReactNode => {
	if (!args.error) return;
	const Component = getComponents()[args.error.props?.errorCode] ?? DefaultErrorComponent;
	return Component(args);
};

export default GetErrorComponent;
