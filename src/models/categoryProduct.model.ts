import mongoose from "mongoose";
import { listModels } from "./listModels";

export interface CategoryProductDocumet extends mongoose.Document {
  name: string;
  createAt: Date;
  updateAt: Date;
}

const categoryProductSchema = new mongoose.Schema<CategoryProductDocumet>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const CategoryProductModel = mongoose.model<CategoryProductDocumet>(
  listModels.categoryProduct,
  categoryProductSchema
);

export default CategoryProductModel;
