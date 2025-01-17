import mongoose from "mongoose";
import mongoose, { Schema } from "mongoose";
const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    },
    price: {
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

export const Payment = mongoose.model("Payment", paymentSchema);
