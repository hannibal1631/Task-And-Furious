import mongoose, { Document, Schema, Types } from "mongoose";

interface ITask extends Document {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  title: string;
  subtitle?: string;
  description?: string;
  priority?: "low" | "medium" | "high" | "urgent";
}

const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
