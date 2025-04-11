import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
    userId: string;
    bookId: string;
    quantity: number;
}

const CartSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 }
    },
    { timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);