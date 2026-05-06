import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Workspace } from "../models/workspace.models";
import { generateToken } from "../utils/generateToken";
import { Invite } from "../models/invite.models";
import { sendEmail } from "../utils/mailer";
import { User } from "../models/user.models";

const sendInvite = asyncHandler(async (req, res) => {
  const { workspaceId, userId } = req.params;
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  const isAdmin = workspace.members.some(
    (m) => m.user && m.user.toString() === userId && m.role === "admin"
  );

  if (!isAdmin) {
    throw new ApiError(403, "Only admin can invite");
  }

  const token = generateToken();

  const invite = await Invite.create({
    email,
    workspaceId,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const inviteLink = `http://localhost:3000/invite/${token}`;

  await sendEmail({
    name: email,
    email,
    emailType: "INVITE",
    inviteLink,
  });

  res
    .status(200)
    .json(new ApiResponse(200, invite, "Invite sent successfully"));
});

const acceptInvite = asyncHandler(async (req, res) => {
  const { token, userId } = req.params;

  const invite = await Invite.findOne({
    token,
    expiresAt: { $gt: new Date() },
    accepted: false,
  });
  if (!invite) {
    throw new ApiError(400, "Invalid or expired invite");
  }

  const workspace = await Workspace.findById(invite.workspaceId);
  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.email !== invite.email) {
    throw new ApiError(403, "This invite is not for you");
  }

  const alreadyMember = workspace.members.some(
    (m) => m.user && m.user.toString() === userId
  );

  if (!alreadyMember) {
    workspace.members.push({
      user: user._id,
      role: "member",
    });

    await workspace.save();
  }

  invite.accepted = true;
  await invite.save();

  res.status(200).json(new ApiResponse(200, workspace, "Joined workspace"));
});

export { sendInvite, acceptInvite };
