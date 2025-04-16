import mongoose, { Schema, Document } from "mongoose";

export interface IUserBook extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "buyer" | "seller";
}

const UserBookSchema: Schema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true } 
);

export const UserBook =  mongoose.model<IUserBook>("UserBook", UserBookSchema);