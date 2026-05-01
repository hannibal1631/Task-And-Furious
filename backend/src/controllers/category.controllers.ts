import { Category } from "../models/category.models";
import { User } from "../models/user.models";
import { Workspace } from "../models/workspace.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const addCategory = asyncHandler(async (req, res) => {
  // get category name from body and user id, workspace id from params
  // find user by user id
  // if user not found throw error
  // if workspace id is present then find workspace by workspace id
  // if workspace not found throw error
  // if workspace id is present then check user is member of workspace or not
  // if not member throw error
  // check category with same name already exists for user in workspace or not
  // if exists throw error
  // create category
  // return res

  const { categoryName } = req.body;
  const { userId, workspaceId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (workspaceId) {
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ApiError(404, "Workspace not found");
    }

    const isMember = workspace.members.some(
      (m) => m.user && m.user.toString() === user._id.toString()
    );

    if (!isMember) {
      throw new ApiError(403, "Not a workspace member");
    }
  }

  const existingCategory = await Category.findOne({
    categoryName,
    userId,
    workspace: workspaceId || null,
  });

  if (existingCategory) {
    throw new ApiError(400, "Category already exists");
  }

  const category = await Category.create({
    userId,
    categoryName,
    workspaceId: workspaceId ? (workspaceId as any) : null,
    isDefault: false,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        category,
        workspaceId
          ? "Team Category create successfully"
          : "Personal category create successfully"
      )
    );
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

const getDefaultCategories = asyncHandler(async (req, res) => {
  // find all default categories
  // return res

  const categories = await Category.find({ isDefault: true })
    .select("_id categoryName")
    .sort({ categoryName: 1 });

  return res.status(200).json(new ApiResponse(200, categories));
});

const getAllCategoriesByUserId = asyncHandler(async (req, res) => {
  // get user id from params
  // find all categories by user id and default categories
  // return res

  const { userId } = req.params;

  const categories = await Category.find({
    $or: [{ isDefault: true }, { userId }],
  }).sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, categories));
});

export {
  addCategory,
  updateCategory,
  deleteCategory,
  getDefaultCategories,
  getAllCategoriesByUserId,
};
