import { Category } from "../models/category.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const addCategory = asyncHandler(async (req, res) => {
  // get user id from params and category name from body
  // create category
  // return res

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

const updateCategory = asyncHandler(async (req, res) => {
  // get category id from params and category name from body
  // find category by id
  // if category not found throw error
  // update category name
  // return res

  const { categoryId } = req.params;
  const { categoryName } = req.body;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (categoryName !== undefined) category.categoryName = categoryName;

  await category.save();

  res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  // get category id from params
  // find category by id
  // if category not found throw error
  // delete category
  // return res

  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  await Category.findByIdAndDelete(categoryId);

  res.status(200).json(new ApiResponse(200, "Category delete successfully"));
});

export { addCategory, updateCategory, deleteCategory };
