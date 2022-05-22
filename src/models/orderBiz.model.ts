import mongoose from "mongoose";
import { listModels } from "./listModels";

interface limit {
  min: string;
  max: string;
  realMax: string | null;
}

interface method {
  id: number;
  name: string;
}

export interface OrderBizDocument extends mongoose.Document {
  list: number;
  type: string;
  crypto: string;
  currency: string;
  id: number;
  rate: string;
  limits: {
    crypto: limit;
    currency: limit;
  };
  paymethod: method;
  createAt: Date;
  updateAt: Date;
}

const orderSchema = new mongoose.Schema<OrderBizDocument>(
  {
    list: { type: Number, required: true },
    type: { type: String, enum: ["selling", "purchase"], required: true },
    crypto: { type: String, enum: ["BTC"], required: true },
    currency: { type: String, enum: ["RUB"], required: true },
    id: { type: Number, required: true },
    rate: { type: String, required: true },
    limits: {
      crypto: {
        min: { type: String },
        max: { type: String },
        realMax: { type: String || null },
      },
      currency: {
        min: { type: String },
        max: { type: String },
        realMax: { type: String || null },
      },
    },
    paymethod: {
      id: { type: Number },
      name: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const OrderBizModel = mongoose.model<OrderBizDocument>(
  listModels.orders_bizlato,
  orderSchema
);
  

export default OrderBizModel;
