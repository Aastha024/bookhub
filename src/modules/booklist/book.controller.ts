import { NextFunction, Request, Response } from "express";
import postEntity from "../../entities/post.entity";
import { uploadOnCloudinary } from "../../utils/cloudinary";
import userEntity from "../../entities/user.entity";

interface AuthRequest extends Request {
  postOwner?: any;
}

interface MulterFiles {
    [fieldname: string]: Express.Multer.File[];
  }

export class BookController {
  public createPost = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { postOwner, bookName, authorName, description, price } = req.body;

      const user = await userEntity.findOne({ _id: postOwner });
      if (!user) {
        return res.status(400).json({ message: "Owner is not found!" });
    }

        if (!bookName || !authorName || !description || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
    
        if (isNaN(price)) {
            return res.status(400).json({ message: "Price must be a number" });
        }

        const files = req.files as MulterFiles;

        const coverImage = files['coverImage'];
        const image = files['image']?.[0].path;

      if (!req.files) {
        return res.status(400).json({ message: "Image upload failed" });
      }

      const uploadResult = await uploadOnCloudinary(image, 'image');
      const uploadedCoverImages = await Promise.all(
        coverImage.map(file => uploadOnCloudinary(file.path, `coverImage`))
      );
      const coverImageUrls = uploadedCoverImages.map((result: any) => result.secure_url);
      
      if (!uploadResult) {
        return res.status(500).json({ message: "Image upload on cloudinary failed" });
      }

      const newBook = {
        bookName,
        authorName,
        description,
        price: parseFloat(price),
        image: `${uploadResult.secure_url}`,
        coverImage: coverImageUrls,
        postOwner: postOwner,
      };
      const post = new postEntity(newBook);
      await post.save();

      return res.status(201).json({
        message: "Book created successfully",
        book: newBook,
      });
    } catch (error) {
      console.error("Error creating book:", error);
      next(error);
    }
  };

  public getAllPosts = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try{
        const posts = await postEntity.find().populate("postOwner", "name email");
        if (!posts) {
            return res.status(404).json({ message: "No posts found" });
        }
        return res.status(200).json(posts);

    }catch (error) {
        console.error("Error fetching posts:", error);
        next(error);
    }
  }
}
