import { Router } from "express";
import { RoleController } from "../role/role.controller";
import { userRoleDto } from "../role/dto/role.dto";
import { Validator } from "../../../helpers/validate";

const router = Router();
const roleController = new RoleController();

router.post("/create-role", Validator.validate(userRoleDto), roleController.createRole);
router.get("/get-role", roleController.getRole);

export default router;