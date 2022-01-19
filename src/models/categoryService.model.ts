import mongoose from "mongoose";
import { listModels } from "./listModels";

export interface CategoryServiceDocumet extends mongoose.Document {
  name: string;
  createAt: Date;
  updateAt: Date;
}

const categoryProductSchema = new mongoose.Schema<CategoryServiceDocumet>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const CategoryServiceModel = mongoose.model<CategoryServiceDocumet>(
  listModels.categoryService,
  categoryProductSchema
);

export default CategoryServiceModel;
