import AllPermissionMap from "@ext/security/logic/PermissionMap/AllPermissionMap";
import AllPermission from "../Permission/AllPermission";
import User from "./User";

const localUser = new User(
	true,
	{ name: "admin", id: "admin", mail: "admin" },
	new AllPermission(),
	new AllPermissionMap(),
	new AllPermissionMap(),
);

export default localUser;
