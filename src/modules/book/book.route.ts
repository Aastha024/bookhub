import { Router } from "express";
import { Validator } from "../../helpers/validate";
import authMiddleware from "../../middlewares/auth.middlewares";
import {upload} from "../../middlewares/multer.middleware";
import { PostBookDto } from "./dto/book.dto";
import { ProductController } from "./book.controller";
import { UpdateBookDto } from "./dto/update-book.dto";

const router = Router();
const productController = new ProductController();

// router.post("/create-post", upload.single('image'), authMiddleware, bookController.createPost); // here upload middleware is used to upload single image
// router.post("/create-pdf", upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'pdfs', maxCount: 8 }]), authMiddleware, bookController.createPdf);
// router.post("/create-post", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'coverImage', maxCount: 8 }]), authMiddleware, productController.createPost);
router.post("/create-post", upload.single('coverImage'), Validator.validate(PostBookDto), authMiddleware, productController.createPost);
router.get("/get-books/:userId", authMiddleware, productController.getBooksById);
router.get("/get-all-books", authMiddleware, productController.getAllBooks);
router.put("/update-books", Validator.validate(UpdateBookDto), authMiddleware, productController.getAllBooks);



export default router;