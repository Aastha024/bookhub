
import { NextFunction, Response, Request } from "express";
import { Permissions } from "../admin/acl/permissions.enum";
import { getRolePermissions } from "../admin/acl/role-permissions";
import { JwtHelper } from "../helpers/jwt.helper";
import { Role } from "../admin/entities/role.entity";

interface AuthRequest extends Request {
    user?: any;
  }

const rolePermissionsMap = getRolePermissions();
console.log("🚀 ~ rolePermissionsMap:", rolePermissionsMap)

export const acl = (requiredPermission: Permissions) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<any>  => {
    const token = req.header("Authorization")?.split(" ")[2];
    if (!token) {
      return res.status(401).json({ code: 401, reason: "Unauthorized: No token provided" });
    }

    const user = JwtHelper.decode<any>(token);
    if (!user) {
        return res.status(401).json({ code: 401, reason: "Unauthorized: Invalid or expired token"  });
    }

    if (!user.role) {
      return res.status(403).json({ code: 403, reason: "Unauthorized: Invalid or expired token"  });
    }

    const userRole = await Role.findById(user.role);

    const permissions = rolePermissionsMap.find(role => role.role === userRole.role)?.permissions || [];
    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({ code: 403, reason: "Unauthorized: You are not allowed to access this route"  });
    }
    req.user = user;
    return next();
  };
};
