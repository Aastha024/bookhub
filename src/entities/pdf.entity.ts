import mongoose, { Schema, Document } from "mongoose";

export interface Pdf extends Document {
    pdf: string;
    pdfs: string[];
}

const PDFSchema: Schema = new Schema(
  {
    pdf: { type: String, required: true },
    pdfs: { type: [String], required: true }
  },
  { timestamps: true }
);

export default mongoose.model<Pdf>("Pdf", PDFSchema);
