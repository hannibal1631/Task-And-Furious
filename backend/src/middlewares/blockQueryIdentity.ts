import { Request, Response, NextFunction } from "express";

export const blockQueryIdentity = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query.userId || req.query.username || req.query.email) {
    return res.status(400).json({
      message:
        "Do not send userId or username or email in query. Use authentication token.",
    });
  }

  next();
};
