import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema({
    //Make Schema here  
      
  },{
      timestamps: true
  })
  
  
  export const Order = mongoose.model("Order", orderSchema)
  