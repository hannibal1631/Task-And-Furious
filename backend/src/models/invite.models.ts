import mongoose, { Schema, Types, Document } from "mongoose";

interface IInvite extends Document {
  email: string;
  workspaceId: Types.ObjectId;
  token: string;
  expiresAt: Date;
  accepted: boolean;
}

const inviteSchema = new Schema<IInvite>(
  {
    email: {
      type: String,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
    },
    token: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Invite = mongoose.model<IInvite>("Invite", inviteSchema);
