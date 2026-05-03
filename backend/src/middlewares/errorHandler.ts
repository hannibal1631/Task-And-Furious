import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger/index";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Unhandled Error", {
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    message: "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
