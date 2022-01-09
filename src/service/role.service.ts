import { DocumentDefinition, FilterQuery } from "mongoose";
import RoleModel, { RoleDocumet } from "../models/role.model";

export async function findRole(query: FilterQuery<RoleDocumet>) {
  return RoleModel.find(query).lean();
}

export async function createRole(
  input: DocumentDefinition<Omit<RoleDocumet, "createAt" | "updateAt">>
) {
  return RoleModel.create(input);
}