import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyJWT = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // const authHeader = req.header("Authorization");

      // const token =
      //   req.cookies?.accessToken ||
      //   (authHeader && authHeader.startsWith("Bearer ")
      //     ? authHeader.split(" ")[1]
      //     : null);

      const token = req.cookies?.accessToken;

      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }

      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;

      const userId = decodedToken?.userId || decodedToken?._id;

      if (!userId) {
        throw new ApiError(401, "Invalid token payload");
      }

      const user = await User.findById(userId).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new ApiError(401, "Invalid access token");
      }

      req.user = user;

      next();
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(401, error?.message || "Invalid access token");
      }

      throw new ApiError(401, "Invalid access token");
    }
  }
);
