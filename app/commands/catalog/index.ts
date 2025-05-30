import language from "@app/commands/catalog/language";
import create from "./create";
import getBrotherFileNames from "./getBrotherFileNames";
import getLogo from "./getLogo";
import remove from "./remove";
import getReviewLink from "./review/getReviewLink";
import getReviewLinkData from "./review/getReviewLinkData";
import getShareLink from "./share/getShareLink";
import getShareLinkData from "./share/getShareLinkData";
import getShareTicket from "./share/getShareTicket";
import updateNavigation from "./updateNavigation";
import updateProps from "./updateProps";
import getAddedCounters from "./properties/getAddedCounters";
import getViewRenderData from "@app/commands/catalog/properties/getViewRenderData";
import getUserTicket from "@app/commands/catalog/user/getToken";

const catalog = {
	review: {
		getShareLink,
		getReviewLink,
		getShareTicket,
		getShareLinkData,
		getReviewLinkData,
	},
	create,
	remove,
	getLogo,
	getBrotherFileNames,
	getViewRenderData,
	getAddedCounters,
	updateNavigation,
	getUserTicket,
	updateProps,
	language,
};

export default catalog;
