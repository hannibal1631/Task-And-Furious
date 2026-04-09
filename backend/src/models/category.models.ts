import mongoose, { Document, Schema, Types } from "mongoose";

interface ICategory extends Document {
  categoryName: string;
  userId: Types.ObjectId;
  isDefault: boolean;
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
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
