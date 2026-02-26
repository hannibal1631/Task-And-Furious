import { Router } from "express";
import {
  changeCurrentPassword,
  createProfilePicture,
  forgotPassword,
  getCurrentUser,
  logoutUser,
  signinUser,
  signupUser,
} from "../controllers/user.controllers";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/multer.middlewares";

const router = Router();

router.route("/sign-up").post(signupUser);
router.route("/sign-in").post(signinUser);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(changeCurrentPassword);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);

router
  .route("/:userId/profile-picture")
  .post(upload.single("profilePicture"), createProfilePicture);

export default router;
