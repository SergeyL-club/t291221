import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, getParamUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHadler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getParamUserHadler(req: Request, res: Response) {
  try {
    const userParam = await getParamUser(res.locals.user._id);
    return res.status(200).json(userParam);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e);
  }
}
