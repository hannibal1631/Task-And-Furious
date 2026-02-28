import mongoose, { Document, Schema, Types } from "mongoose";

interface ITask extends Document {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  date?: Date;
  time?: string;
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
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
