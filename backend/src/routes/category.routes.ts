import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategoriesByUserId,
  getDefaultCategories,
  updateCategory,
} from "../controllers/category.controllers";

const router = Router();

router.route("/personal/:userId").post(addCategory);
router.route("/team/:workspaceId/:userId").post(addCategory);

router.route("/:categoryId").put(updateCategory);
router.route("/:categoryId").delete(deleteCategory);

router.route("/default").get(getDefaultCategories);

router.route("/:userId").get(getAllCategoriesByUserId);

export default router;
