import { Router } from "express";
import { createWorkspace } from "../controllers/workspace.controllers";

const router = Router();

router.route("/").post(createWorkspace);

export default router;
