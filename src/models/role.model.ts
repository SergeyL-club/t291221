import mongoose from "mongoose";
import { listModels } from "./listModels";

export interface RoleDocumet extends mongoose.Document {
  name: string;
  funClient: boolean;
  funAdmin: boolean;
  createAt: Date;
  updateAt: Date;
}

const roleSchema = new mongoose.Schema<RoleDocumet>(
  {
    name: { type: String, required: true, unique: true },
    funClient: { type: Boolean, default: true },
    funAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const RoleModel = mongoose.model<RoleDocumet>(listModels.role, roleSchema);

export default RoleModel;
