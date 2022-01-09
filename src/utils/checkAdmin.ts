import mongoose from "mongoose";
import RoleModel from "../models/role.model";
import UserModel from "../models/user.model";

const checkAdmin = async function (userId: mongoose.Types.ObjectId) {
  const user = await UserModel.findOne({ _id: userId });

  if (!user) return false;

  const role = await RoleModel.findOne({ _id: user.roleId });

  if (!role || !role.funAdmin) return false;

  return true;
};

export default checkAdmin;
