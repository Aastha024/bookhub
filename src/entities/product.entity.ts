import mongoose, {Schema} from "mongoose";

export interface IProduct extends Document {
    bookName: string;
    authorId: number;
    description: string;
    price: number;
    coverImage: string;
    categoryId: number;
  }

const ProductSchema: Schema = new Schema({
    bookName: {
        type: String,
        required: true,
    },
    authorId: {
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
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }
},
{ timestamps: true }
)

export const Product = mongoose.model("Product", ProductSchema);