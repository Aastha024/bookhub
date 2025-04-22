import { Router } from "express";
import { Validator } from "@helpers/validate";
import authMiddleware from "@middlewares/auth.middleware";
import { MiscController } from "./misc.controller";

const router = Router();
const miscController = new MiscController();

router.get("/roles", miscController.roles);

export default router;