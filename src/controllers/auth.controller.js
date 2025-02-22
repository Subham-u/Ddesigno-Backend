import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  sendForgetPassword,
  sendVerificationEmail,
} from "../services/email-services.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, mobileNo } = req.body;

  if (!email || !password || !name || !mobileNo) {
    return res.status(400).json({
      message: "Email, password and name are required",
    });
  }

  const isExisting = await User.findOne({ email });

  if (isExisting) {
    return res.status(401).json({
      message: "your email already exists",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
   mobileNo
  });

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  delete userWithoutPassword.orderHistory;

  await sendVerificationEmail(
    userWithoutPassword.email,
    userWithoutPassword._id
  );
  delete userWithoutPassword._id;

  return res
    .status(200)
    .json(new ApiResponse(200, { userData: userWithoutPassword }));
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Your not signed up",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "your password is wrong",
    });
  }

  if (user.isVerified === false) {
    await sendVerificationEmail(user.email, user._id);
    return res.status(401).json({
      message: "Email not verified",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  res.cookie("token", token, {
    secure: false,
    sameSite: "lax",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  });

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  delete userWithoutPassword.orderHistory;
  delete userWithoutPassword._id;

  return res
    .status(200)
    .json(new ApiResponse(200, { userData: userWithoutPassword }));
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {

  return res.status(200).json(new ApiResponse(200, { userData: req.user }));
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(401, "user not found");
  }
  user.isVerified = true;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { message: "Email verified successfully" }));
});

export const forgetPassword = asyncHandler(async (req, res) => {
  const { id, newPassword } = req.body;
  if (!id || !newPassword) {
    throw new ApiError("id or password is missing");
  }
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError("user not found");
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { message: "password change" }));
});

export const forgetEmailPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError("email is missing");
  }
  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    throw new ApiError("user not found");
  }

  if (user.isVerified === false) {
    await sendVerificationEmail(user.email, user._id);
    return res.status(401).json({
      message: "please verify you mail",
    });
  }

  await sendForgetPassword(user.email, user._id);
  return res.status(200).json({
    message: "email sent",
  });
});
