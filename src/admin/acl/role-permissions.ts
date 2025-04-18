import { migratePermissionsMapToRolePermissionsMap } from "../../helpers/permissions.helper";
import { Roles } from "../../types/types";
import { Permissions } from "./permissions.enum";

type PermissionsMap = Partial<{
    [Key in Permissions]: Roles[];
  }>;
  

export const getRolePermissions = () => {
  const permissions: PermissionsMap = {
    [Permissions.GetUser]: [Roles.Admin],
    [Permissions.UpdateUser]: [Roles.Admin, Roles.Buyer, Roles.Seller], //doubt
    [Permissions.DeleteUser]: [Roles.Admin],
    [Permissions.CreateCategory]: [Roles.Admin],
    [Permissions.UpdateCategory]: [Roles.Admin],
    [Permissions.DeleteCategory]: [Roles.Admin],
    [Permissions.GetCategory]: [Roles.Admin, Roles.Seller],
    [Permissions.GetBookById]: [Roles.Seller],
    [Permissions.CreateBook]: [Roles.Seller],
    [Permissions.UpdateBook]: [Roles.Admin, Roles.Seller],
    [Permissions.DeleteBook]: [Roles.Admin, Roles.Seller],
    [Permissions.bookSearch]: [Roles.Admin, Roles.Buyer, Roles.Seller],
    [Permissions.addToCart]: [Roles.Buyer],
    [Permissions.removeFromCart]: [Roles.Buyer],
    [Permissions.getCart]: [Roles.Buyer],
  };

  return migratePermissionsMapToRolePermissionsMap(permissions);
};
