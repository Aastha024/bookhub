import { NextFunction, Request, Response } from "express";
// import postEntity from "../../entities/post.entity";
import { uploadOnCloudinary, uploadPDFOnCloudinary } from "@utils/cloudinary";
import { User } from "@entities/user.entity";
import { JwtHelper } from "@helpers/jwt.helper";
import { Book } from "@entities/book.entity"
import { Category } from "@adminEntities/category.entity";

interface AuthRequest extends Request {
  postOwner?: any;
}

interface BookDetails {
  name?: string;
  category?: string;
  description?: string;
  coverImage?: string;
  price?: number;
  author?: string;
}

export class ProductController {
  public createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      // req.body - name, category, description, coverImage, price, userId
      // check whether the user is already registered or not
      // check whether the roleId is correct or not
      // check category is present in the database or not
      // req.file - coverImage
      // upload the image to cloudinary & check whether the image is uploaded or not
      // save the data to database
      // send the response
      const { name, category, description, price } = req.body;
      const coverImage = req.file?.path;

      if (!name || !category || !description || !price) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      const token = req.header("Authorization")?.split(" ")[2];
      console.log("🚀 ~ ProductController ~ token:", req.header("Authorization"))

      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      const categoryExist = await Category.findOne({name: category});

      if(!categoryExist) {
        return res.status(400).json({ message: "Category not found" });
      }

      const decoded = JwtHelper.decode(token) as { id: string };

      const user = await User.findById(decoded.id);

      if(!user) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
      }
      // add it as middleware or permissions
      // if(user.role !== "seller") {
      //   return res.status(401).json({ message: "User must has buyer role" });
      // }
       if (!req.file) {
        return res.status(400).json({ message: "Image upload failed" });
      }
      const uploadResult = await uploadOnCloudinary(coverImage, `coverImage/${user._id}`);

      if(!uploadResult) {
        return res.status(500).json({ message: "Image upload on cloudinary failed" });
      }

      const post = {
        name,
        category: categoryExist._id,
        description,
        price: parseFloat(price),
        coverImage: uploadResult.secure_url,
        author: user._id,
      }

      const postData = new Book(post);
      await postData.save();
      return res.status(201).json({
        message: "Post created successfully",
        post: postData,
      });
     
    } catch (error) {
      console.error("Error creating book:", error);
      next(error);
    }
  };

  
  public getBooksById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
      try{
        // req.params - id
        // fetch the post by id
        // return response in array format

        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = req.header("Authorization")?.split(" ")[2];
        const decoded = JwtHelper.decode(token) as { id: string };
        if(decoded.id !== userId) {
          return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        }

        const books = await Book.find({ author: userId }).populate("author", "name email");

        if(!books) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({
            message: "Post fetched successfully",
            post: books,
        });

        // const posts = await Book.find().populate("postOwner", "name email");
        // if (!posts) {
        //     return res.status(404).json({ message: "No posts found" });
        // }
        // return res.status(200).json(posts);

    }catch (error) {
        console.error("Error fetching posts:", error);
        next(error);
    }
}

  public getAllBooks = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try{
      // fecth all books
      // response in array format

      const books = await Book.find().populate("author", "name email");
      if (!books) {
        return res.status(404).json({ message: "No books found" });
      }
      return res.status(200).json({
        message: "Books fetched successfully",
        books,
      });
    } catch (error) {
      console.error("Error fetching books:", error);
      next(error);
    }
  }

  public updateBook = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try{
      // req.body - name, category, description, coverImage, price
      // req.params - book id
      // access token and get Id, based on id find user
      // user exists or not
      // get book id to updatethe data
      // req.file - coverImage
      // upload the image to cloudinary & check whether the image is uploaded or not
      // save the data to database
      // send the response

      const { name, category, description, price } = req.body;
      const bookId = req.params.bookId;
      const coverImage = req.file?.path;

      const token = req.header("Authorization")?.split(" ")[2];
      console.log("🚀 ~ ProductController ~ updateBook= ~ token:", token)
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }
      const decoded = JwtHelper.decode(token) as { id: string };
      const user = await User.findById(decoded.id);
      
      if(!user) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
      }

      const book = await Book.findById(bookId);
      console.log("🚀 ~ ProductController ~ updateBook= ~ book:", book)
      if(!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      // if(user._id.toString() !== book.author.toString()) {
      //   return res.status(401).json({ message: "Unauthorized: You are not allowed to update this book" });
      // }
      
      if(!user.role){
        return res.status(403).json({ message: "Unauthorized: Invalid or expired token" });
      }
      
      const updatedBookData: Partial<BookDetails> = {
        name: name || book.name,
        category: category || book.category,
        description: description || book.description,
        price: price || book.price
      }
      console.log("🚀 ~ ProductController ~ updateBook= ~ updatedBookData:", updatedBookData)
      
      if(coverImage){
        const uploadResult = await uploadOnCloudinary(coverImage, `coverImage/${user._id}`);
        if(!uploadResult) {
          return res.status(500).json({ message: "Image upload on cloudinary failed" });
        }
        updatedBookData.coverImage = uploadResult.secure_url;
      }

      const updatedBookDetails = await Book.findByIdAndUpdate(
        { _id: bookId },
        updatedBookData,
        { new: true, runValidators: true }
      );
      console.log("🚀 ~ ProductController ~ updateBook= ~ updatedBookDetails:", updatedBookDetails)

      if(!updatedBookDetails) {
        return res.status(404).json({ message: "Book is not updated" });
      }

      return res.status(200).json({
        message: "Book updated successfully",
        book: updatedBookDetails,
      });


    }catch (error) {
      console.error("Error updating book:", error);
      next(error);
    }
  }

  public deleteBook = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try{
      // req.params - book id
      // access token and get Id, based on id find user
      // user exists or not
      // get book id to delete the data
      // check if the book is present or not
      // delete the book
      // send the response

      const bookId = req.params.bookId;
      const token = req.header("Authorization")?.split(" ")[2];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      const decoded = JwtHelper.decode(token) as { id: string };
      const user = await User.findById(decoded.id);
      if(!user) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
      }

      const book = await Book.findById(bookId);

      if(!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      if(user._id.toString() !== book.author.toString()) {
        return res.status(401).json({ message: "Unauthorized: You are not allowed to delete this book" });
      }

      const deletedBook = await Book.findByIdAndDelete(bookId);
      if(!deletedBook) {
        return res.status(404).json({ message: "Book is not deleted" });
      }

      return res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook,
      });

    }catch (error) {
      console.error("Error deleting book:", error);
      next(error);
    }
  }

// create an endpoint to upload pdf on cloudinary (practice purpose)
//   public createPdf = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//     try {

//       const files = req.files as MulterFiles;
//       console.log("🚀 ~ BookController ~ createPdf= ~ files:", files)
//       const pdfFile = files['pdf']?.[0].path;
//       console.log("🚀 ~ BookController ~ createPdf= ~ pdfFile:", pdfFile)
//       const pdfFiles = files['pdfs'];

//       if (!req.files) {
//         return res.status(400).json({ message: "PDF upload failed" });
//       }

//       const uploadResult = await uploadPDFOnCloudinary(pdfFile);
//       const uploadedPdfFiles = await Promise.all(
//         pdfFiles.map(file => uploadPDFOnCloudinary(file.path))
//       );
//       console.log("🚀 ~ BookController ~ createPdf= ~ uploadedPdfFiles:", uploadedPdfFiles)

//       if (!uploadResult) {
//         return res.status(500).json({ message: "PDF upload on cloudinary failed" });
//       }

//       const newPdf = {
//         pdf: `${uploadResult.secure_url}`,
//         pdfs: uploadedPdfFiles.map((result: any) => result.secure_url),
//       };
//       const post = new pdfEntity(newPdf);
//       await post.save();

//       return res.status(201).json({
//         message: "PDF created successfully",
//         book: newPdf,
//       });
//     } catch (error) {
//       console.error("Error creating PDF:", error);
//       next(error);
//     }
//   }
}
