import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocumet } from "../models/user.model";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocumet, "createAt" | "updateAt" | "comparePassword">
  >
) {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
