import { Router } from "express";
import {
  completeTask,
  createTask,
  deleteTask,
  getAllTaskByUserId,
  updateTask,
} from "../controllers/task.controllers";

const router = Router();

router.route("/personal/:userId/:categoryId").post(createTask);
router.route("/team/:workspaceId/:userId/:categoryId").post(createTask);

router.route("/:taskId").put(updateTask);
router.route("/:taskId").delete(deleteTask);
router.route("/:taskId").patch(completeTask);
router.route("/user/:userId").get(getAllTaskByUserId);

export default router;
