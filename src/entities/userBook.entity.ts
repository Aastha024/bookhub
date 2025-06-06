import mongoose, { Schema, Document } from "mongoose";

export interface IUserBook extends Document {
  _id: string;
  userId: number;
  bookId: number;
}

const UserBookSchema: Schema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true } 
);

export const UserBook =  mongoose.model<IUserBook>("UserBook", UserBookSchema);