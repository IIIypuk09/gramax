export type EnvironmentVariable = {
	PORT: string;
	ENTERPRISE_SERVER_URL: string;

	SUBMODULE_BRANCH_NAME: string;
	GRAMAX_VERSION: string;
	SERVER_APP: "true" | "false";
	PRODUCTION: "true" | "false";
	READ_ONLY_MODE: "true" | "false";

	// FileProvider
	ROOT_PATH: string;
	BASE_PATH: string;
	USER_DATA_PATH: string;
	LOCAL_DOC_PATH: string;

	// Other
	SHARE_ACCESS_TOKEN: string;
	DOC_READER_MAIL: string;
	DOC_READER_MAIL_PASSWORD: string;

	// Algolia
	NEXT_PUBLIC_ALGOLIA_APP_ID: string;
	ALGOLIA_SEARCH_ADMIN_KEY: string;
	ALGOLIA_SEARCH_INDEX_NAME: string;

	// Typesense
	TUPESENSE_HOST: string;
	TUPESENSE_PORT: string;
	TUPESENSE_PROTOCOL: string;
	TUPESENSE_API_KEY: string;
	TUPESENSE_COLLECTION_NAME: string;

	// Bugsnag
	BUGSNAG_API_KEY: string;

	// kafka
	KAFKA_CONNECTION: string;

	// Admin
	ADMIN_LOGIN: string;
	ADMIN_PASSWORD: string;
};

export const defaultVariables: Partial<EnvironmentVariable> = {
	GRAMAX_VERSION: "unknown-version",
};
