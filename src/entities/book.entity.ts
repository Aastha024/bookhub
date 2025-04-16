import mongoose, {Schema} from "mongoose";

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
    author: {
        type:Schema.Types.ObjectId,
        ref: "User",
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

export const Book = mongoose.model<IBook>("Book", BookSchema);