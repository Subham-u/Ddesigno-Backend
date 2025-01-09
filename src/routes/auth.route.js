import { Router } from "express";
import {
  getCurrentUser,
  logout,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").get(authenticate, logout);
router.route("/me").get(authenticate, getCurrentUser);
export default router;
