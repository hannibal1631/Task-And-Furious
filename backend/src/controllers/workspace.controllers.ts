import { Workspace } from "../models/workspace.models";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createWorkspace = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const workspace = await Workspace.create({
    name,
    owner: req.user?._id,
    members: [{ user: req.user?._id, role: "admin" }],
  });

  res
    .status(201)
    .json(new ApiResponse(201, workspace, "Workspace create successfully"));
});

export { createWorkspace };
