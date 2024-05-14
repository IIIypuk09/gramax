import { getExecutingEnvironment } from "@app/resolveModule/env";
import Button from "@components/Atoms/Button/Button";
import Icon from "@components/Atoms/Icon";
import SpinnerLoader from "@components/Atoms/SpinnerLoader";
import { parserQuery } from "@core/Api/Query";
import { waitForTempToken } from "@ext/git/actions/Source/tempToken";
import { useEffect, useState } from "react";
import createChildWindow from "../../../../../../ui-logic/ChildWindow/createChildWindow";
import PageDataContextService from "../../../../../../ui-logic/ContextServices/PageDataContext";
import useLocalize from "../../../../../localization/useLocalize";
import SourceType from "../../../../../storage/logic/SourceDataProvider/model/SourceType";
import { makeSourceApi } from "../../makeSourceApi";
import GitHubSourceData from "../logic/GitHubSourceData";
import GitHubUser from "./GitHubUser";

const CreateGitHubSourceData = ({ onSubmit }: { onSubmit?: (editProps: GitHubSourceData) => void }) => {
	const page = PageDataContextService.value;
	const authServiceUrl = PageDataContextService.value.conf.authServiceUrl;
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	const loadUser = async (token) => {
		if (!token || !token?.access_token) return;
		const api = makeSourceApi(
			{ sourceType: SourceType.gitHub, token: token.access_token } as GitHubSourceData,
			authServiceUrl,
		);
		setUser(await api.getUser());
	};

	useEffect(() => void loadUser(token), [token]);

	return (
		<>
			<div className="form-group field field-string row field-height">
				<div className="control-label">Пользователь</div>
				{token ? (
					<div className="input-lable">
						{user ? (
							<div className="input-lable">
								<GitHubUser {...user} />
							</div>
						) : (
							<SpinnerLoader height={25} width={25} lineWidth={2} />
						)}
					</div>
				) : (
					<Button
						fullWidth
						className="input-lable"
						onClick={async () => {
							if (token) return;
							createChildWindow(
								`${authServiceUrl}/github?redirect=${page?.domain}${page?.conf.basePath ?? ""}`,
								450,
								500,
								"https://github.com/login/device/success",
								(location) => setToken(parserQuery(location.search)),
							);

							if (getExecutingEnvironment() == "browser") setToken(parserQuery(await waitForTempToken()));
						}}
					>
						<div>
							<Icon code="github" />
							<span>Войти в GitHub</span>
						</div>
					</Button>
				)}
			</div>
			<div className="buttons">
				<Button
					disabled={!user || !token}
					onClick={() => {
						onSubmit({
							sourceType: SourceType.gitHub,
							domain: "github.com",
							token: token.access_token,
							userName: user.name,
							userEmail: user.email,
							refreshToken: token.refresh_token,
							createDate: new Date().toJSON(),
						});
					}}
				>
					{useLocalize("add")}
				</Button>
			</div>
		</>
	);
};

export default CreateGitHubSourceData;
