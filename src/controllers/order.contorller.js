import { Order } from "../models/oder.model";
import { asyncHandler } from "../utils/asyncHandler";

const createOrderFromCart = asyncHandler(
    async(req,res)=>{
        const{address,userId,cartId,totalPrice}=req.body;
        const newOrder = Order.create({
            user:userId,
            address,



        })

    }
)