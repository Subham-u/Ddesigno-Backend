import { Order } from "../models/oder.model";
import { asyncHandler } from "../utils/asyncHandler";

const createOrder = asyncHandler(
    async(req,res)=>{
        const{customer,userId,products,selectedAttributes,variantImages,totalPrice}=req.body;
        const newOrder = Order.create({
            user:userId,
            customer,
            
        })

    }
)