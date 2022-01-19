import { FilterQuery, DocumentDefinition } from "mongoose";
import CategoryServiceModel, {
  CategoryServiceDocumet,
} from "../models/categoryService.model";

export async function findCategoryService(
  query: FilterQuery<CategoryServiceDocumet>
) {
  return CategoryServiceModel.find(query);
}

export async function findOneCategoryService(
  query: FilterQuery<CategoryServiceDocumet>
) {
  return CategoryServiceModel.findOne(query);
}

export async function createCategoryService(
  input: DocumentDefinition<
    Omit<CategoryServiceDocumet, "createAt" | "updateAt">
  >
) {
  return CategoryServiceModel.create(input);
}

export async function deleteOneCategoryService(
  query: FilterQuery<CategoryServiceDocumet>
) {
  return CategoryServiceModel.findOneAndDelete(query);
}
