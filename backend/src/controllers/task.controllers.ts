import { Category } from "../models/category.models";
import { Task } from "../models/task.models";
import { User } from "../models/user.models";
import { Workspace } from "../models/workspace.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createTask = asyncHandler(async (req, res) => {
  // get title, description, priority, date, time from body and userId, categoryId, workspaceId from params
  // find user by userId
  // if user not found throw error
  // if workspaceId is present then find workspace by workspaceId
  // if workspace not found throw error
  // if workspaceId is present then check user is member of workspace or not
  // if not member throw error
  // if categoryId is present then find category by categoryId
  // if category not found throw error
  // if workspaceId is present then check category workspaceId is same as workspaceId
  // if not same throw error
  // if workspaceId is not present then check category workspaceId is null
  // if not null throw error
  // create task
  // return res

  const { title, description, priority, date, time } = req.body;
  const { userId, categoryId, workspaceId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  let type = "personal";

  if (workspaceId) {
    type = "team";

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

  if (categoryId) {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    if (workspaceId) {
      if (category.workspaceId?.toString() !== workspaceId) {
        throw new ApiError(400, "Invalid team category");
      }
    } else {
      if (category.workspaceId) {
        throw new ApiError(400, "Invalid personal category");
      }
    }
  }

  const task = await Task.create({
    title,
    description,
    priority,
    date,
    time,
    userId,
    categoryId: categoryId ? (categoryId as any) : null,
    workspaceId: workspaceId ? (workspaceId as any) : null,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        task,
        workspaceId
          ? "Team task create successfully"
          : "Personal task create successfully"
      )
    );
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

const completeTask = asyncHandler(async (req, res) => {
  // get task id from params
  // find task by id
  // if task not found throw error
  // if task status is completed then change to pending else change to completed
  // task saved
  // return res

  const { taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.status === "completed") {
    task.status = "pending";
  } else {
    task.status = "completed";
  }

  await task.save();

  res.status(200).json(new ApiResponse(200, task, "Task marked as completed"));
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

export { createTask, updateTask, deleteTask, completeTask, getAllTaskByUserId };
