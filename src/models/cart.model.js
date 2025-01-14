import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Reference to the product being ordered
  },
 
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
  originalPrice:{
    type:Number,
    required:true
  },
  offerdPrice:{
    type:Number,
    required:true
  } // The quantity of the product ordered


},{
    timestamps:true
});

// Model for the order
export const CartItem = mongoose.model("CartItem", CartItemSchema);