import { Router } from "express";
import {
  forgetEmailPassword,
  forgetPassword,
  getCurrentUser,
  logout,
  signin,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { rateLimiter } from "../utils/rateLimite.js";
const router = Router();

router.use(rateLimiter);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").get(authenticate, logout);
router.route("/me").get(authenticate, getCurrentUser);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgetEmailPassword);
router.route("/reset-password").post(forgetPassword);

export default router;
