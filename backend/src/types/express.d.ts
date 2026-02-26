import { Types } from "mongoose";
import { Multer } from "multer";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId;
        fullName?: string;
        email?: string;
      };
      file?: Multer.File;
      files?: Multer.File[];
    }
  }
}
