import mongoose, { Schema, Document } from "mongoose";

export interface IUserRole extends Document {
  _id: string;
  userId: number;
  roleId: number;
}

const UserRoleSchema: Schema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true } 
);

export const UserRole =  mongoose.model<IUserRole>("UserRole", UserRoleSchema);