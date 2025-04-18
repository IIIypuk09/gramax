import FetchService from "@core-ui/ApiServices/FetchService";
import ApiUrlCreatorService from "@core-ui/ContextServices/ApiUrlCreator";
import PageDataContextService from "@core-ui/ContextServices/PageDataContext";
import { useDebounce } from "@core-ui/hooks/useDebounce";
import getStorageNameByData from "@ext/storage/logic/utils/getStorageNameByData";
import { useCallback, useState } from "react";

export type UseRemoveSourceProps = {
	sourceName: string;
};

const useRemoveSource = ({ sourceName }: UseRemoveSourceProps) => {
	const apiUrlCreator = ApiUrlCreatorService.value;
	const pageDataContext = PageDataContextService.value;
	const [isLoading, setIsLoading] = useState(false);

	const { start: debouncedDisplayLoading, cancel: cancelDisplayLoading } = useDebounce(() => setIsLoading(true), 350);

	const getSourceUsage = useCallback(async () => {
		try {
			debouncedDisplayLoading();
			const res = await FetchService.fetch(apiUrlCreator.getSourceDataUsage(sourceName));
			if (res.ok) return (await res.json()) as string[];
		} finally {
			cancelDisplayLoading();
			setIsLoading(false);
		}
		return [];
	}, [apiUrlCreator, sourceName]);

	const removeSource = useCallback(async () => {
		try {
			debouncedDisplayLoading();
			const res = await FetchService.fetch(apiUrlCreator.removeSourceData(sourceName));
			if (res.ok) {
				pageDataContext.sourceDatas = pageDataContext.sourceDatas.filter(
					(s) => getStorageNameByData(s) !== sourceName,
				);
			}
		} finally {
			cancelDisplayLoading();
			setIsLoading(false);
		}
	}, [apiUrlCreator, sourceName]);

	return { removeSource, getSourceUsage, isLoading };
};

export default useRemoveSource;
