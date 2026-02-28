import { Task } from "../models/task.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createTask = asyncHandler(async (req, res) => {
  // get user id from params and title, description, categoryId, priority, date, time from body
  // create task
  // return res

  const { title, description, categoryId, priority, date, time } = req.body;
  const { userId } = req.params;

  const task = await Task.create({
    title,
    description,
    categoryId,
    priority,
    date,
    time,
    userId,
  });

  res.status(200).json(new ApiResponse(200, task, "Task create successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  // get task id from params and title, description, priority, date, time from body
  // find task by id
  // if tak not found throw error
  // update task
  // return res

  const { taskId } = req.params;
  const { title, description, priority, date, time } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (priority !== undefined) task.priority = priority;
  if (date !== undefined) task.date = date;
  if (time !== undefined) task.time = time;

  await task.save();

  res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  // get task id from params
  // find task by id
  // if task not found throw error
  // delete task
  // return res

  const { taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await Task.findByIdAndDelete(taskId);

  res.status(200).json(new ApiResponse(200, "Task delete successfully"));
});

const getAllTaskByUserId = asyncHandler(async (req, res) => {
  // get user id from params
  // find all task by user id
  // return res

  const { userId } = req.params;

  const tasks = await Task.find({ userId })
    .populate("categoryId")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Get task successfully"));
});

export { createTask, updateTask, deleteTask, getAllTaskByUserId };
