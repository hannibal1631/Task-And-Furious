import { Task } from "../models/task.models";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createTask = asyncHandler(async (req, res) => {
  const { title, subtitle, description, categoryId, priority } = req.body;
  const { userId } = req.params;

  const task = await Task.create({
    title,
    subtitle,
    description,
    categoryId,
    priority,
    userId,
  });

  res.status(200).json(new ApiResponse(200, task, "Task create successfully"));
});

export { createTask };
