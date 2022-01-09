import { Request, Response, NextFunction } from "express";

const antiRequireUser = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;

  if (user) {
    return res.sendStatus(403);
  }
  return next();
};

export default antiRequireUser;
