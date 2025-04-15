import { Router } from "express";
import { CreateUserDto } from "./dto/createUser.dto";
import { AuthController } from "./auth.controller";
import { Validator } from "../../helpers/validate";
import authMiddleware from "../../middlewares/auth.middlewares";
import { SignInDto } from "./dto/signIn.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

const router = Router();
const authController = new AuthController();


// Signup route with DTO validation
router.post("/sign-up", Validator.validate(CreateUserDto), authController.create);
router.post("/sign-in", Validator.validate(SignInDto), authController.signIn);
router.post("/logout", authMiddleware, authController.logout);
router.delete("/delete", authMiddleware, authController.deleteUser);
router.put("/update", Validator.validate(UpdateUserDto), authMiddleware, authController.updateUser);

export default router;