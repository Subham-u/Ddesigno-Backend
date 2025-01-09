import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;

  if (!email || !password || !name) {
    throw new ApiError(401, "email or password are missing");
  }

  const isExisting = await User.findOne({ email });

  if (isExisting) {
    throw new ApiError(401, "user already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    image: image,
  });

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  delete userWithoutPassword.orderHistory;

  res.cookie("token", token, {
    // sameSite: process.env.PRODUCTION === "true" ? "None" : "Lax",
    maxAge: new Date(Date.now() + parseInt(1 * 24 * 60 * 60 * 1000)),
    // secure: process.env.PRODUCTION === "true" ? true : false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { userData: userWithoutPassword }));
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Your not signed up");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "your Password is worng");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );
  res.cookie("token", token, {
    secure: false,
    sameSite: "lax",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  });
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  delete userWithoutPassword.orderHistory;

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
