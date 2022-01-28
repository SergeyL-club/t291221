import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, Types } from "mongoose";
import RoleModel from "../models/role.model";
import UserModel, { UserDocumet } from "../models/user.model";
import { findOneRole } from "./role.service";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocumet, "createAt" | "updateAt" | "comparePassword" | "roleId">
  >
) {
  try {
    const role = await RoleModel.findOne({ funClient: true });

    let newRole;
    if (!role) {
      newRole = await RoleModel.create({ name: "Client" });
    }

    let modifyInput;
    if (role) {
      modifyInput = { ...input, roleId: role._id };
    } else if (newRole) {
      modifyInput = { ...input, roleId: newRole._id };
    }

    const user = await UserModel.create(modifyInput);

    return omit(user.toJSON(), "password", "__v");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findOneUser(query: FilterQuery<UserDocumet>) {
  return UserModel.findOne(query);
}

export async function findUser(query: FilterQuery<UserDocumet>) {
  return UserModel.find(query);
}

export async function getParamUser(id: Types.ObjectId) {
  let candidate = await findOneUser({ _id: id });
  if (candidate) {
    let role = await findOneRole({ _id: candidate.roleId });
    return {
      ...omit(candidate.toJSON(), "roleId", "password"),
      role,
    };
  }
  return new Error(`No candidate`);
}
