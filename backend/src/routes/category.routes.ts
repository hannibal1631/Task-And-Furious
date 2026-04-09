import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getDefaultCategories,
  updateCategory,
} from "../controllers/category.controllers";

const router = Router();

router.route("/:userId").post(addCategory);
router.route("/:categoryId").put(updateCategory);
router.route("/:categoryId").delete(deleteCategory);

router.route("/default").get(getDefaultCategories);

export default router;
