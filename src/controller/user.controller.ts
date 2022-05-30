import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, findOneFullUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(200).send(user).end();
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message).end();
  }
}

export async function getUserHandler(
  req: Request,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    
    const user = await findOneFullUser({ _id: userId });

    return res
      .status(200)
      .send(
        omit(
          user.toJSON(),
          "_id",
          "password",
          "role._id",
          "role.createdAt",
          "role.updatedAt",
          "createdAt",
          "updatedAt",
          "role.__v",
          "__v"
        )
      )
      .end();
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message).end();
  }
}