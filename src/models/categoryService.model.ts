import mongoose from "mongoose";
import { listModels } from "./listModels";

export interface CategoryServiceDocumet extends mongoose.Document {
  name: string;
  imgUrl: string;
  createAt: Date;
  updateAt: Date;
}

const categoryProductSchema = new mongoose.Schema<CategoryServiceDocumet>(
  {
    name: { type: String, required: true, unique: true },
    imgUrl: { type: String, required: true },
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
