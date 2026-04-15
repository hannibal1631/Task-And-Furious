import { Router } from "express";
import {
  changeCurrentPassword,
  createProfilePicture,
  forgotPassword,
  getCurrentUser,
  signupUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controllers";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/multer.middlewares";
import { blockQueryIdentity } from "../middlewares/blockQueryIdentity";

const router = Router();

router.route("/sign-up").post(signupUser);
router.route("/login").post(loginUser);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(changeCurrentPassword);

router.route("/refresh-token").post(refreshAccessToken);

// secured routes
router.route("/logout").post(verifyJWT, blockQueryIdentity, logoutUser);
router
  .route("/current-user")
  .get(verifyJWT, blockQueryIdentity, getCurrentUser);

router
  .route("/:userId/profile-picture")
  .post(upload.single("profilePicture"), createProfilePicture);

export default router;
