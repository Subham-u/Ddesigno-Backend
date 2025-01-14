import mongoose, { Schema } from "mongoose";
const addressSchema = new Schema(
  { 
    title:{
    required:true,
    type: String,
  },
    address: { type: String, required: true },
    pincode:{type: String, required: true},
    phone: { type: String, required: true },

    user: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    location:{
      type:{type:String,required:true},
      coordinates:[]
  },
  },
    
  {
    timestamps: true,
  },
);
addressSchema.index({location:"2dsphere"})
export const Address = mongoose.model("Address", addressSchema);