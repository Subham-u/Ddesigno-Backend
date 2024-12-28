import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNo: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    orderHistory: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
    location: {
      type: { type: String, required: true },
      coordinates: [],
    },
  },
  {
    timestamps: true,
  },
);
userSchema.index({ location: "2dsphere" });

export const User = mongoose.model("User", userSchema);

