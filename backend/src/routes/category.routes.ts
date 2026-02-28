import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controllers";

const router = Router();

router.route("/:userId").post(addCategory);
router.route("/:categoryId").put(updateCategory);
router.route("/:categoryId").delete(deleteCategory);

export default router;
