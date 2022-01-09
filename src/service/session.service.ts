import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocumet } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findOneUser } from "./user.service";
import config from "config";
import { ConfigParam } from "../../config/default";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session;
}

export async function findSessions(query: FilterQuery<SessionDocumet>) {
  return SessionModel.find(query);
}

export async function updateSession(
  query: FilterQuery<SessionDocumet>,
  update: UpdateQuery<SessionDocumet>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findOneUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>(ConfigParam.accessTokenTtl) } // 15 minutes in config
  );

  return accessToken;
}
