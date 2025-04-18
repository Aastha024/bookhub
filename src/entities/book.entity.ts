import mongoose, {Schema} from "mongoose";
import { UserBook } from "./userBook.entity";

export interface IBook extends Document {
    name: string;
    author: number;
    description: string;
    price: number;
    coverImage: string;
    category: number;
  }

const BookSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
   
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }
},
{ timestamps: true }
)


BookSchema.post("findOneAndDelete", async function (doc) {
    console.log("🚀 ~ doc:", doc)
    if (doc) {
      await UserBook.deleteMany({ book: doc._id });
    }
  });

export const Book = mongoose.model<IBook>("Book", BookSchema);