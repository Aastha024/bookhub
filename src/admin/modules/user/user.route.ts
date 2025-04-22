import { Router } from "express";
import { Validator } from "../../../helpers/validate";
import { acl } from "@middlewares/acl.middleware";
import { Permissions } from "@acl/permissions.enum";
import { UserController } from "./user.controller";
import { UpdateUserProfileDto } from "./dto/updateUserProfile.dto";

const router = Router();
const userController = new UserController();

router.get("/get-users", acl(Permissions.GetUser), userController.getUser);
router.put("/update-user-profile/:id", Validator.validate(UpdateUserProfileDto), acl(Permissions.UpdateUser), userController.updateUserProfile);
router.delete("/delete-user/:id", acl(Permissions.DeleteCategory), userController.deleteUser);

export default router;