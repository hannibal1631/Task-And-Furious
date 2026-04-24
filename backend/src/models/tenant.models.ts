import mongoose, { Schema } from "mongoose";

interface ITenant extends Document {
  name: string;
}

const tenantSchema = new Schema<ITenant>(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Tenant = mongoose.model<ITenant>("Tenant", tenantSchema);
