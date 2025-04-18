import { Router } from "express";
import { Validator } from "../../../helpers/validate";
import { CategoryController } from "./category.controller";
import { categoryDto } from "./dto/category.dto";
import { acl } from "@middlewares/acl.middleware";
import { Permissions } from "@acl/permissions.enum";

const router = Router();
const categoryController = new CategoryController();

router.post("/create-category", Validator.validate(categoryDto), acl(Permissions.CreateCategory), categoryController.createCategory);
router.get("/get-category", acl(Permissions.GetCategory), categoryController.getCategory);

export default router;