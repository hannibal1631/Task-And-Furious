import mongoose, { Document, Schema, Types } from "mongoose";

interface Member {
  user: Types.ObjectId;
  role: "admin" | "member";
}

export interface IWorkspace extends Document {
  name: string;
  owner: Types.ObjectId;
  members: Member[];
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          default: "member",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Workspace = mongoose.model<IWorkspace>(
  "Workspace",
  workspaceSchema
);
