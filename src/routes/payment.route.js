import { Router } from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/payment.controller.js";
const router = Router();
router.route("/checkout").post(checkout);
router.route("/verify-payment").post(paymentVerification);
router
  .route("/get-key")
  .get((req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
  );

export default router;
