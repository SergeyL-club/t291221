import { DocumentDefinition, FilterQuery } from "mongoose";
import RoleModel, { RoleDocumet } from "../models/role.model";

export async function findRole(query: FilterQuery<RoleDocumet>) {
  return RoleModel.find(query);
}

export async function findOneRole(query: FilterQuery<RoleDocumet>) {
  return RoleModel.findOne(query);
}

export async function createRole(
  input: DocumentDefinition<Omit<RoleDocumet, "createAt" | "updateAt">>
) {
  return RoleModel.create(input);
}

export async function deleteOneRole(query: FilterQuery<RoleDocumet>) {
  return RoleModel.findOneAndDelete(query);
}
