import { Router } from "express";
import { createTask } from "../controllers/task.controllers";

const router = Router();

router.route("/:userId/create-task").post(createTask);

export default router;
