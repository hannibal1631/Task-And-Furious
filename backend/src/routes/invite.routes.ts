import { Router } from "express";
import { acceptInvite, sendInvite } from "../controllers/invite.controllers";

const router = Router();

router.route("/send/:workspaceId/:userId").post(sendInvite);
router.route("/accept/:token/:userId").post(acceptInvite);

export default router;
