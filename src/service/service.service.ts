import { FilterQuery, DocumentDefinition } from "mongoose";
import ServiceModel, { ServiceDocumet } from "../models/service.model";

export async function findService(query: FilterQuery<ServiceDocumet>) {
  return ServiceModel.find(query);
}

export async function createService(
  input: DocumentDefinition<Omit<ServiceDocumet, "createAt" | "updateAt">>
) {
  try {
    const service = await ServiceModel.create(input);
    return service.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deleteOneService(query: FilterQuery<ServiceDocumet>) {
  return (await ServiceModel.findOneAndDelete(query))?.toJSON();
}
