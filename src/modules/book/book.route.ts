import { Router } from "express";
import { Validator } from "@helpers/validate";
import authMiddleware from "@middlewares/auth.middleware";
import { upload } from "@middlewares/multer.middleware";
import { PostBookDto } from "./dto/book.dto";
import { ProductController } from "./book.controller";
import { UpdateBookDto } from "./dto/update-book.dto";
import { acl } from "@middlewares/acl.middleware";
import { Permissions } from "@acl/permissions.enum";

const router = Router();
const productController = new ProductController();

// router.post("/create-post", upload.single('image'), authMiddleware, bookController.createPost); // here upload middleware is used to upload single image
// router.post("/create-pdf", upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'pdfs', maxCount: 8 }]), authMiddleware, bookController.createPdf);
// router.post("/create-post", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'coverImage', maxCount: 8 }]), authMiddleware, productController.createPost);
router.post("/create-post",upload.single('coverImage'), Validator.validate(PostBookDto), acl(Permissions.CreateBook), productController.createPost);
router.get("/get-books/:userId", acl(Permissions.GetBookById), productController.getBooksById);
router.get("/get-all-books", productController.getAllBooks);
router.patch("/update-books/:bookId", acl(Permissions.UpdateBook), upload.single('coverImage'), Validator.validate(UpdateBookDto), authMiddleware, productController.updateBook);
router.delete("/delete-book/:bookId", acl(Permissions.DeleteBook), productController.deleteBook);

export default router;