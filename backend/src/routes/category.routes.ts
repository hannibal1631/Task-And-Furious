import { Router } from "express";
import { addCategory } from "../controllers/category.controllers";

const router = Router();

router.route("/:userId/create-category").post(addCategory);

export default router;
