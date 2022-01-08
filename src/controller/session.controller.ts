import { Request, Response } from "express";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { ConfigParam } from "../../config/default";

export async function createSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send("Invalid email or password");

  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>(ConfigParam.accessTokenTtl) } // 15 minutes in config
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>(ConfigParam.refreshTokenTtl) } // 1 year in config
  );

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
