import mongoose from "mongoose";
import { listModels } from "./listModels";

export interface ProductDocumet extends mongoose.Document {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  abDesc: string;
  desc: string;
  imgUrls: Array<string>;
  createAt: Date;
  updateAt: Date;
}

const productSchema = new mongoose.Schema<ProductDocumet>(
  {
    name: { type: String, required: true, unique: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: listModels.categoryProduct,
    },
    abDesc: { type: String, default: "" },
    desc: { type: String, default: "" },
    imgUrls: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocumet>(
  listModels.product,
  productSchema
);

export default ProductModel;
