import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTaskByUserId,
  updateTask,
} from "../controllers/task.controllers";

const router = Router();

router.route("/:userId").post(createTask);
router.route("/:taskId").put(updateTask);
router.route("/:taskId").delete(deleteTask);
router.route("/user/:userId").get(getAllTaskByUserId);

export default router;
