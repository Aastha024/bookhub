import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
    userId: string;
    bookId: string;
    quantity: number;
    orderStatus: "pending" | "completed" | "cancelled";
}

const OrderSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, default: 1 },
    orderStatus: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" }
},
{ timestamps: true }
)

export const Order = mongoose.model<IOrder>("Order", OrderSchema);