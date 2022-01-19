import mongoose from "mongoose";
import { listModels } from "./listModels";

export interface ProductDocumet extends mongoose.Document {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  abDesc: string;
  desc: string;
  imgPreviewUrls: Array<string>;
  imgGalleryUrls: Array<string>;
  prices: Array<PriceSchema>;
  createAt: Date;
  updateAt: Date;
}

export interface PriceSchema {
  currency: string;
  cost: number;
}

export enum Currency {
  usd = "USD",
  rub = "RUB",
}

export const priceSchema = new mongoose.Schema<PriceSchema>(
  {
    currency: { type: String, enum: Currency },
    cost: { type: Number },
  },
  {
    _id: false,
  }
);

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
    prices: [priceSchema],
    imgPreviewUrls: [{ type: String }],
    imgGalleryUrls: [{ type: String }],
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
