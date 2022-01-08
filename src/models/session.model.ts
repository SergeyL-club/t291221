import mongoose from "mongoose";
import { listModels } from "./listModels";
import { UserDocumet } from "./user.model";

export interface SessionDocumet extends mongoose.Document {
  user: UserDocumet["_id"];
  valid: boolean;
  userAgent: string;
  createAt: Date;
  updateAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocumet>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: listModels.user },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<SessionDocumet>(
  listModels.session,
  sessionSchema
);

export default SessionModel;
