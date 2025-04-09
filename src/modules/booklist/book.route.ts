import { Router } from "express";
import { Validator } from "../../helpers/validate";
import authMiddleware from "../../middlewares/auth.middlewares";
import {upload} from "../../middlewares/multer.middleware";
import { PostBookDto } from "./dto/book.dto";
import { BookController } from "./book.controller";

const router = Router();
const bookController = new BookController();

// router.post("/create-post", upload.single('image'), authMiddleware, bookController.createPost); // here upload middleware is used to upload single image
// router.post("/create-pdf", upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'pdfs', maxCount: 8 }]), authMiddleware, bookController.createPdf);
router.post("/create-post", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'coverImage', maxCount: 8 }]), authMiddleware, bookController.createPost);
router.get("/get-all-posts", authMiddleware, bookController.getAllPosts);

export default router;