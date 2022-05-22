import { DocumentDefinition, FilterQuery } from "mongoose";
import OrderBizModel, { OrderBizDocument } from "../models/orderBiz.model";



export async function findOneOrderBiz(query: FilterQuery<OrderBizDocument>) {
  return OrderBizModel.findOne(query);
}

export async function findOrderBiz(query: FilterQuery<OrderBizDocument>) {
  return OrderBizModel.find(query);
}

export async function deleteManyOrderBiz(query: FilterQuery<OrderBizDocument>) {
  return OrderBizModel.deleteMany(query);
}

export async function createOrderBiz(
  input: DocumentDefinition<Omit<OrderBizDocument, "createAt" | "updateAt">>
) {
  return OrderBizModel.create(input);
}