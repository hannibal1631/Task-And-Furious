import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI as string}/${DB_NAME}`,
    );
    console.log(
      `n\ MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MONGODB connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
