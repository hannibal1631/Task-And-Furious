import mongoose from "mongoose";
import { Category } from "../models/category.models";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_CATEGORIES = [
  "Work",
  "Personal",
  "Study",
  "Health",
  "Shopping",
  "Finance",
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    for (const categoryName of DEFAULT_CATEGORIES) {
      await Category.updateOne(
        { categoryName, userId: null },
        {
          $set: {
            categoryName,
            isDefault: true,
            userId: null,
          },
        },
        { upsert: true }
      );
    }

    console.log("Default categories inserted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
