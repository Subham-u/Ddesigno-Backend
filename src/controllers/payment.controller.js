import { ApiError } from "../utils/ApiError.js";
import Razorpay from "razorpay";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
import { json } from "express";

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });
  
export const checkout = asyncHandler( async (req, res) => {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    
    };
    const order = await instance.orders.create(options);
    if(!order){
        ApiError(500,"Some Error Occured While Paying")
    }
  
    res.status(200).json(new ApiResponse(200,order,"Rozarpay order created"))
  })

  export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      // Database comes here
  
      const payment = await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,

      });
  
      res.status(200).json(
        new ApiResponse(200, payment , "Payment Done")
      )
    } else {
      res.status(400).json({
        success: false,
      });
    }
  };