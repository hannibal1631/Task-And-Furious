import { Router } from "express";
import { signupUser } from "../controllers/user.controllers";
import { verifyJWT } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/sign-up").post(signupUser);

export default router;
