import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  address:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
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
  quantity: { type: Number, required: true },
  offerdPrice:{type:Number , required: true},
  originalPrice:{type:Number , required: true} // The quantity of the product ordered

}],
  
// Images related to the selected variant (e.g., size and color combination images)
 
totalOriginalPrice: { type: Number, required: true },
totalOfferdPrice: { type: Number, required: true }, // Total price of the order (price * quantity)
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending", // Status of the order
  },
  review:[{
    type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
       
  }],
  payment:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  }
// Timestamp of order updates
},{
  timestamps: true
});

// Model for the order
export const Order = mongoose.model("Order", OrderSchema);
