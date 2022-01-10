import { FilterQuery, DocumentDefinition } from "mongoose";
import CategoryProductModel, {
  CategoryProductDocumet,
} from "../models/categoryProduct.model";

export async function findCategoryProduct(
  query: FilterQuery<CategoryProductDocumet>
) {
  return CategoryProductModel.find(query);
}

export async function createCategoryProduct(
  input: DocumentDefinition<
    Omit<CategoryProductDocumet, "createAt" | "updateAt">
  >
) {
  return CategoryProductModel.create(input);
}

export async function deleteOneCategoryProduct(
  query: FilterQuery<CategoryProductDocumet>
) {
  return CategoryProductModel.findOneAndDelete(query);
}
