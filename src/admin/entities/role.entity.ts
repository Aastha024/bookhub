import { NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
    _id: number;
    role: "buyer" | "seller";
  }

const RoleSchema: Schema = new Schema(
  {
    role: { type: String, required: true, enum: ["buyer", "seller"] },
  },
  { timestamps: true }
);

// Custom validation using a pre-save hook
// RoleSchema.pre<IRole>("save", function (next: NextFunction) {
//   const validRoles: IRole["role"][] = ["buyer", "seller"];
//   console.log("🚀 ~ validRoles:", validRoles)
//   if (!validRoles.includes(this.role)) {
//     return next(new Error("Admin cannot add another role except buyer or seller"));
//   }
//   next();
// });

export const Role = mongoose.model<IRole>("Role", RoleSchema);