import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { listModels } from "./listModels";
import { ConfigParam } from "../../config/default";

export interface UserDocumet extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createAt: Date;
  updateAt: Date;
  comparePassword(cadidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocumet;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(
    config.get<number>(ConfigParam.saltWorkFactor)
  );

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  cadidatePassword: string
): Promise<boolean> {
  const user = this as UserDocumet;

  return bcrypt.compare(cadidatePassword, user.password).catch((e) => {
    return false;
  });
};

const UserModel = mongoose.model(listModels.user, userSchema);

export default UserModel;