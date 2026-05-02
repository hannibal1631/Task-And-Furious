import { Router } from "express";
import {
  addTeammates,
  createWorkspace,
  getWorkspaceByUserId,
} from "../controllers/workspace.controllers";

const router = Router();

router.route("/:userId").post(createWorkspace);
router.route("/:workspaceId/members/:userId").post(addTeammates);

router.route("/user/:userId").get(getWorkspaceByUserId);

export default router;
