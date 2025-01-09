import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
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
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
