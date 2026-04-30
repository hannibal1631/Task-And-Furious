import mongoose, { Document, Schema, Types } from "mongoose";

interface ITask extends Document {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  title: string;
  description?: string;
  status?: "pending" | "completed";
  priority?: "low" | "medium" | "high";
  date?: Date;
  time?: string;
  type?: "personal" | "team";
  workspaceId: Types.ObjectId;
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
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    type: {
      type: String,
      enum: ["personal", "team"],
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      default: null,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
