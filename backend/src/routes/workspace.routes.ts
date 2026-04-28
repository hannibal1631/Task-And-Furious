import { Router } from "express";
import {
  addTeammates,
  createWorkspace,
} from "../controllers/workspace.controllers";

const router = Router();

router.route("/:userId").post(createWorkspace);
router.route("/:workspaceId/members/:userId").post(addTeammates);

export default router;
