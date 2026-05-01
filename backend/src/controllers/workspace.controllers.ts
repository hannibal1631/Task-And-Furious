import { User } from "../models/user.models";
import { Workspace } from "../models/workspace.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createWorkspace = asyncHandler(async (req, res) => {
  // get userId from params and name from body
  // check if user exists
  // create workspace with user as owner and member with admin role
  // return workspace

  const { name } = req.body;
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const workspace = await Workspace.create({
    name,
    owner: user._id,
    members: [{ user: user._id, role: "admin" }],
  });

  res
    .status(201)
    .json(new ApiResponse(201, workspace, "Workspace create successfully"));
});

const addTeammates = asyncHandler(async (req, res) => {
  // get userId and workspaceId from params and teammates from body
  // if teammates is not array and email is present, convert to array of objects with email
  // check userId exists
  // teammates is array of objects
  // check current user found
  // check workspace found
  // check current user is admin of workspace
  // for each teammate check if user with email exists, if not add to notFound array, if exists check if already a member of workspace, if not add to members with role member and increment added count
  // return added count and notFound array

  let { teammates } = req.body;
  const { workspaceId, userId } = req.params;

  if (!teammates && req.body.email) {
    teammates = [{ email: req.body.email }];
  }

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  if (!Array.isArray(teammates)) {
    throw new ApiError(400, "Teammates must be an array");
  }

  const currentUser = await User.findById(userId);

  if (!currentUser) {
    throw new ApiError(404, "User not found");
  }

  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  const isAdmin = workspace?.members.some(
    (m) =>
      m.user &&
      m.user.toString() === currentUser._id.toString() &&
      m.role === "admin"
  );

  if (!isAdmin) {
    throw new ApiError(403, "Only admin allowed");
  }

  let added = 0;
  let notFound: string[] = [];

  for (const mate of teammates) {
    if (!mate.email) continue;

    const user = await User.findOne({ email: mate.email });

    if (!user) {
      notFound.push(mate.email);
      continue;
    }

    const exists = workspace.members.some(
      (m) => m.user && m.user.toString() === user._id.toString()
    );

    if (!exists) {
      workspace?.members.push({
        user: user._id,
        role: "member",
      });
      added++;
    }
  }

  await workspace.save();

  res
    .status(201)
    .json(new ApiResponse(201, { added, notFound }, "Teammates processed"));
});

export { createWorkspace, addTeammates };
