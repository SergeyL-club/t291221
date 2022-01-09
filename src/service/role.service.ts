import { DocumentDefinition, FilterQuery } from "mongoose";
import RoleModel, { RoleDocumet } from "../models/role.model";

export async function findRole(query: FilterQuery<RoleDocumet>) {
  return RoleModel.find(query).lean().select("-__v");
}

export async function createRole(
  input: DocumentDefinition<Omit<RoleDocumet, "createAt" | "updateAt">>
) {
  return RoleModel.create(input);
}

export async function deleteOneRole(query: FilterQuery<RoleDocumet>) {
  return RoleModel.findOneAndDelete(query);
}
