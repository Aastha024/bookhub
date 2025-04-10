import { time } from "console";
import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
    categoryName: string;
    description: string;
}

const CategorySchema: Schema = new Schema({
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export const Category = mongoose.model<ICategory>("Category", CategorySchema);