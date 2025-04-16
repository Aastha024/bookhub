import { migratePermissionsMapToRolePermissionsMap } from "../../helpers/permissions.helper";
import { Roles } from "../../types/types";
import { Permissions } from "./permissions.enum";

type PermissionsMap = Partial<{
    [Key in Permissions]: Roles[];
  }>;
  

export const getRolePermissions = () => {
  const permissions: PermissionsMap = {
    [Permissions.userSignup]: [Roles.Buyer, Roles.Seller],
    [Permissions.userLogin]: [Roles.Admin, Roles.Buyer, Roles.Seller],
    [Permissions.userLogout]: [Roles.Admin, Roles.Buyer, Roles.Seller],
    [Permissions.GetUser]: [Roles.Admin],
    [Permissions.UpdateUser]: [Roles.Admin, Roles.Buyer, Roles.Seller], //doubt
    [Permissions.DeleteUser]: [Roles.Admin],
    [Permissions.GetCategory]: [Roles.Admin, Roles.Buyer],
    [Permissions.CreateCategory]: [Roles.Admin],
    [Permissions.UpdateCategory]: [Roles.Admin],
    [Permissions.DeleteCategory]: [Roles.Admin],
    [Permissions.GetBook]: [Roles.Admin, Roles.Seller],
    [Permissions.GetBookById]: [Roles.Buyer],
    [Permissions.CreateBook]: [Roles.Buyer],
    [Permissions.UpdateBook]: [Roles.Buyer],
    [Permissions.DeleteBook]: [Roles.Admin, Roles.Buyer],
    [Permissions.GetRole]: [Roles.Admin, Roles.Buyer, Roles.Seller],
    [Permissions.bookSearch]: [Roles.Admin, Roles.Buyer, Roles.Seller],
    [Permissions.addToCart]: [Roles.Seller],
    [Permissions.removeFromCart]: [Roles.Seller],
    [Permissions.getCart]: [Roles.Seller],
  };

  return migratePermissionsMapToRolePermissionsMap(permissions);
};
