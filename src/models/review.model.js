import mongoose, { Schema } from "mongoose";
const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
    },
    order: {
      type: Schema.Types.ObjectId,
    },
    product: {
      type: Schema.Types.ObjectId,
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Review = mongoose.model("Review", reviewSchema);
