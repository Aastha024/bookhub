// import mongoose, { Schema, Document } from "mongoose";
 
//  export interface IUser extends Document {
//    name: string;
//    email: string;
//    password: string;
//    role: "buyer" | "seller";
//  }
 
//  const UserSchema: Schema = new Schema(
//    {
//      firstName: { type: String, required: true },
//      lastName: { type: String, required: true },
//      email: { type: String, required: true, unique: true },
//      role: { type: String, required: true },
//      password: { type: String, required: true },
//    },
//    { timestamps: true } // Auto-creates `createdAt` and `updatedAt`
//  );
 
//  export default mongoose.model<IUser>("User", UserSchema);



import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true},
    password: { type: String, required: true },
  },
  { timestamps: true } 
);

export const User =  mongoose.model<IUser>("User", UserSchema);