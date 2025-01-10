import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    pincode:{type: String},
    phone: { type: String, required: true },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Reference to the product being ordered
  },
  products: [{
    product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true, // Reference to the product being ordered
  },
  quantity: { type: Number, required: true }, // The quantity of the product ordered

}],
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
 
  totalPrice: { type: Number, required: true }, // Total price of the order (price * quantity)
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending", // Status of the order
  },
  review:{
    type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
       
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp of order creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp of order updates
});

// Model for the order
export const Order = mongoose.model("Order", OrderSchema);
