import mongoose, { Schema, Document } from "mongoose";

export interface Post extends Document {
    postOwner: string;
    bookName: string;
    authorName: string;
    description: string;
    price: number;
    image: string;
    coverImage: string[];
}

const PostSchema: Schema = new Schema(
  {
    postOwner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookName: { type: String, required: true },
    authorName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    coverImage: { type: [String], required: true }
  },
  { timestamps: true }
);

export default mongoose.model<Post>("Post", PostSchema);
