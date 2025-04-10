import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
    role: "buyer" | "seller";
  }

const RoleSchema: Schema = new Schema(
  {
    role: { type: String, required: true, enum: ["buyer", "seller"] },
  },
  { timestamps: true }
);

export const Role = mongoose.model<IRole>("Role", RoleSchema);