import mongoose, {Schema} from "mongoose";
const productSchema = new Schema({
  //Make Schema here  
    
},{
    timestamps: true
})


export const Product = mongoose.model("Product", productSchema)
