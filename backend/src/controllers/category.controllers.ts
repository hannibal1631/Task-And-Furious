import { Category } from "../models/category.models";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const addCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;
  const { userId } = req.params;

  const category = await Category.create({
    userId,
    categoryName,
  });

  res
    .status(200)
    .json(new ApiResponse(200, category, "Category create successfully"));
});

export { addCategory };
