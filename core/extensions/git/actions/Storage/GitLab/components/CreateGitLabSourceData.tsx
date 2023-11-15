import Form from "@components/Form/Form";
import { JSONSchema7 } from "json-schema";
import { useState } from "react";
import parseStorageUrl from "../../../../../../logic/utils/parseStorageUrl";
import useLocalize from "../../../../../localization/useLocalize";
import GitSourceData from "../../../../core/model/GitSourceData.schema";
import Schema from "../../../../core/model/GitSourceData.schema.json";
import GitLabApi from "../logic/GitLabApi";

Schema.properties = {
	_: "separator",
	domain: Schema.properties.domain,
	token: Schema.properties.token,
	__: "separator",
	userName: Schema.properties.userName,
	userEmail: Schema.properties.userEmail,
} as any;

const CreateGitLabSourceData = ({
	onSubmit,
	props,
	readOnlyProps,
}: {
	onSubmit?: (editProps: GitSourceData) => void;
	props: GitSourceData;
	readOnlyProps?: { [key: string]: string };
}) => {
	const [thisProps, setThisProps] = useState(props);
	const invalidValueText = useLocalize("invalid") + " " + useLocalize("value");
	const invalidTokenText = useLocalize("invalid2") + " " + useLocalize("token");

	const submit = (data: GitSourceData) => {
		if (onSubmit) onSubmit(data);
	};

	const onChange = async (data: GitSourceData) => {
		const domain = parseStorageUrl(data.domain).domain;

		if (data.token && domain) {
			if (data.domain !== domain) {
				data.domain = domain;
				setThisProps({ ...data });
			}
			if (!data.userName || !data.userEmail) {
				const user = await new GitLabApi(data).getUserData();
				data.userName = user.name;
				data.userEmail = user.email;
				setThisProps({ ...data });
			}
		}
	};

	const newSchema = { ...Schema };
	newSchema.properties = { ...newSchema.properties };
	Object.keys(readOnlyProps ?? {}).forEach((key) => {
		if (newSchema.properties?.[key]) newSchema.properties[key] = { readOnly: true, ...newSchema.properties[key] };
	});

	return (
		<Form<GitSourceData>
			initStyles={false}
			schema={newSchema as JSONSchema7}
			props={thisProps}
			onSubmit={submit}
			onChange={onChange}
			fieldDirection="row"
			submitText={useLocalize("add")}
			validate={async ({ domain, token }) => {
				const parseDomain = parseStorageUrl(domain).domain;
				const isErrorToken =
					token && parseDomain
						? !(await new GitLabApi({ domain: parseDomain, token }).tokenIsWorking())
						: false;

				return {
					domain: domain && !parseDomain ? invalidValueText : null,
					token: isErrorToken ? invalidTokenText : null,
				};
			}}
		/>
	);
};

export default CreateGitLabSourceData;
