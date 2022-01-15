import { FilterQuery, DocumentDefinition } from "mongoose";
import ProductModel, { ProductDocumet } from "../models/product.model";

export async function findProduct(query: FilterQuery<ProductDocumet>) {
  return ProductModel.find(query);
}

export async function createProduct(
  input: DocumentDefinition<Omit<ProductDocumet, "createAt" | "updateAt">>
) {
  try {
    const product = await ProductModel.create(input);
    return product.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deleteOneProduct(query: FilterQuery<ProductDocumet>) {
  return (await ProductModel.findOneAndDelete(query))?.toJSON();
}
