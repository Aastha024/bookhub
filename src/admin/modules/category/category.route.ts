import { Router } from "express";
import { Validator } from "../../../helpers/validate";
import { CategoryController } from "./category.controller";
import { categoryDto } from "./dto/category.dto";

const router = Router();
const categoryController = new CategoryController();

router.post("/create-category", Validator.validate(categoryDto), categoryController.createCategory);
router.get("/get-category", categoryController.getCategory);

export default router;