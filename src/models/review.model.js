import mongoose, { Schema } from "mongoose";
const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
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
