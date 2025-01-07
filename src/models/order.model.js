import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true, // Reference to the product being ordered
  },
  selectedAttributes: [
    {
      attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
        required: true,
      }, // Reference to the attribute (e.g., 'Size', 'Color')
      value: { type: String, required: true }, // The specific value of the attribute (e.g., 'Medium', 'Red')
    },
  ],
  variantImages: [
    {
      type: String,
      required: true,
    },
  ], // Images related to the selected variant (e.g., size and color combination images)
  quantity: { type: Number, required: true }, // The quantity of the product ordered
  totalPrice: { type: Number, required: true }, // Total price of the order (price * quantity)
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending", // Status of the order
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp of order creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp of order updates
});

// Model for the order
export const Order = mongoose.model("Order", OrderSchema);
