import { RoleAdmin } from "./route-config-admin";
import { RoleStaff } from "./route-config-staff";

const getRoutes = (role) => {
  const roleType = getMenu(role);
  return roleType?.flatMap((i) => i.items);
};

const getMenu = (role) => {
  switch (role) {
    case "admin":
      return RoleAdmin;
    case "staff":
      return RoleStaff;
    default:
      return null;
  }
};

export { getMenu, getRoutes };
