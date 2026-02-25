import { Router } from "express";
import {
  logoutUser,
  signinUser,
  signupUser,
} from "../controllers/user.controllers";
import { verifyJWT } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/sign-up").post(signupUser);
router.route("/sign-in").post(signinUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
