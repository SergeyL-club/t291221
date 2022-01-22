import mongoose from "mongoose";
import { listModels } from "./listModels";
import { Currency } from "./product.model";

export interface ServiceDocumet extends mongoose.Document {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  abDesc: string;
  desc: string;
  imgPreviewUrls: Array<string>;
  imgGalleryUrls: Array<string>;
  prices: Array<PriceSchema>;
  executors: Array<mongoose.Types.ObjectId>;
  schedules: Array<ScheduleSchema>;
  createAt: Date;
  updateAt: Date;
}

export interface PriceSchema {
  currency: string;
  cost: number;
}

export interface ScheduleSchema extends mongoose.Document {
  dayWeek: string;
  timeStart: string;
  timeEnd: string;
}

export const scheduleSchema = new mongoose.Schema<ScheduleSchema>(
  {
    dayWeek: { type: String },
    timeStart: { type: String },
    timeEnd: { type: String },
  },
  {
    _id: true,
  }
);

export const priceSchema = new mongoose.Schema<PriceSchema>(
  {
    currency: { type: String, enum: Currency },
    cost: { type: Number },
  },
  {
    _id: false,
  }
);

const serviceSchema = new mongoose.Schema<ServiceDocumet>(
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
    schedules: [scheduleSchema],
    executors: [{ type: mongoose.Schema.Types.ObjectId, ref: listModels.user }],
    imgPreviewUrls: [{ type: String }],
    imgGalleryUrls: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const ServiceModel = mongoose.model<ServiceDocumet>(
  listModels.service,
  serviceSchema
);

export default ServiceModel;
