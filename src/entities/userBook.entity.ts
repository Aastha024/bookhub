import mongoose, { Schema, Document } from "mongoose";

export interface IUserBook extends Document {
  _id: string;
  user: number;
  book: number;
}

const UserBookSchema: Schema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true } 
);

export const UserBook =  mongoose.model<IUserBook>("UserBook", UserBookSchema);