import mongoose, { Document, Schema, Types } from "mongoose";
import { ref } from "process";

interface ICategory extends Document {
  categoryName: string;
  userId: Types.ObjectId;
  isDefault: boolean;
  workspaceId: Types.ObjectId;
}

const categorySchema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: [true, "Category name is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      default: null,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
