import { Address } from "../models/address.model.js";
import { CartItem } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addAddress = asyncHandler(
    async(req,res)=>{
        const user = req.user
        const {pincode, address ,phone, title , lat , lng}= req.body
        if(!user){
            throw new ApiError(400,'User Not found')

        }
        const newAddress = await Address.create({
            user: user._id,
            pincode,
            address,
            phone,
            title,
            location:{
                type: "Point",
                coordinates: [parseFloat(lng), parseFloat(lat)]
            }
        });
        if(!newAddress){
            throw new ApiError(400,'Some error accoured while creating in mongodb')
        }
        return res.status(200).json(new ApiResponse(200,newAddress,"Address Created Successfully"))


    }
)
export const addItemToCart = asyncHandler(
    async(req,res)=>{
        const user = req.user
        const {product,selectedAttributes,quantity,originalPrice,offerdPrice} = req.body
        console.log()

        if(!user){
            throw new ApiError(400,'User Not found')
        }
       const newCartItem = await CartItem.create({
        user:user._id,
        product,
        selectedAttributes,
        quantity,
        originalPrice,
        offerdPrice
       })
       
       if(!newCartItem){
        throw new ApiError(400,'CartItem Not created')
       }
       const userToUpdate = await User.findById(user._id)
       userToUpdate.cartItem.push(newCartItem._id)
       await userToUpdate.save()
      
       

       return res.status(200).json(new ApiResponse(200,newCartItem,"Cart fetched Successfully"))

        
    }
)
export const addToWishlist = asyncHandler(
    async(req,res)=>{
        const user = req.user
        if(!user){
            throw new ApiError(400,'User Not found')
        }
        const {productId} = req.body
        console.log(productId)
        const product = await Product.findById(productId);
        if(!product){
            throw new ApiError(400,'product Not found')
        }

   
      const userToUpdate = await User.findById(user._id)
      if(userToUpdate.wishListItems.includes(product._id)){
        throw new ApiError(400,'product already added to wishlist')
      }
      userToUpdate.wishListItems.push(product._id)
       await userToUpdate.save()
       const finalUser = await User.findById(userToUpdate._id)
       

       return res.status(200).json(new ApiResponse(200,finalUser.wishListItems,"Cart fetched Successfully"))

        
    }
)
export const deleteFromWishlist = asyncHandler(
    async(req,res)=>{
        const user = req.user
        if(!user){
            throw new ApiError(400,'User Not found')
        }
        const {productId} = req.params
        console.log(productId)
        const product = await Product.findById(productId);
        if(!product){
            throw new ApiError(400,'product Not found')
        }

   
      const userToUpdate = await User.findById(user._id)
      if(userToUpdate.wishListItems.includes(product._id)===false){
        throw new ApiError(400,'product is not added to wishlist')
      }
      userToUpdate.wishListItems.pop(product._id)
       await userToUpdate.save()
       const finalUser = await User.findById(userToUpdate._id)
       

       return res.status(200).json(new ApiResponse(200,finalUser.wishListItems,"Cart fetched Successfully"))

        
    }
)
export const deleteItemToCart = asyncHandler(
    async(req,res)=>{
        const user = req.user
        const {cartItemId} = req.params
        console.log()

        if(!user){
            throw new ApiError(400,'User Not found')
        }
        if(user.cartItem.includes(cartItemId)===false){
            throw new ApiError(400,'cartItem Not found')
        }
        const deleted = await CartItem.findByIdAndDelete(cartItemId)
        console.log(deleted)
        user.cartItem.pop(cartItemId)
         await user.save()
       
         return res.status(200).json(new ApiResponse(200,"Cart Item deleted Successfully"))

        
    }
)

export const deleteAddress = asyncHandler(
    async(req,res)=>{
        const user = req.user
        const {addressId} = req.params
 

        if(!user){
            throw new ApiError(400,'User Not found')
        }

        const deleted = await Address.findByIdAndDelete(addressId)

           return res.status(200).json(new ApiResponse(200,"Address Deleted Successfully"))

        
    }
)

export const getCartItems = asyncHandler(
    async(req,res)=>{
        const user = req.user 
        if(!user){
            throw new ApiError(400,'User Not found')
        }
        const cartItems = await CartItem.find({
            user:user._id
        }).populate("product")
        if(!cartItems){
            throw new ApiError(500,'Some Issue Occured')
        }
        return res.status(200).json(new ApiResponse(200,cartItems,"Cart Item fetched successfully"))
    }
)


export const getwishlistItems = asyncHandler(
    async(req,res)=>{
        const user = req.user 
        if(!user){
            throw new ApiError(400,'User Not found')
        }
        let products = [] ;
        for (const i of user.wishListItems){
            const gotProduct = await Product.findById(i)
            products.push(gotProduct)
        }
        return res.status(200).json(new ApiResponse(200,products,"Wishlist Item fetched successfully"))
    }
)

export const checkoutCart = asyncHandler(
    async(req,res)=>{
        const user = req.user 
        if(!user){
            throw new ApiError(400,'User Not found')
        }
        const{address} = req.body
        const cartItems = await CartItem.find({
            user:user._id
        })
        
    
        let products = []
        let totalOriginalPrice = 0
        let totalOfferdPrice = 0
        for(const i of cartItems){
            totalOfferdPrice = totalOfferdPrice + i["offerdPrice"],
            totalOriginalPrice = totalOriginalPrice + i["originalPrice"]
            products.push({
                "product":i["product"],
                "selectedAttributes":i["selectedAttributes"],
                "quantity":i["quantity"],
                "offerdPrice":i["offerdPrice"],
                "originalPrice":i["originalPrice"]
            })
        }

        const newOrder = await Order.create({
            user: user._id , 
            address,
            products,
            totalOfferdPrice,
            totalOriginalPrice
        })
        if(!newOrder){
            throw new ApiError(500,"Order can not be created in database")
        }

        return res.status(200).json(new ApiResponse(200,newOrder,"Order created successfully"))
        
    
    }
)

export const checkoutProduct = asyncHandler(
    async(req,res)=>{
        const user = req.user 
        if(!user){
            throw new ApiError(400,'User Not found')
        }
        const{address , productDetails } = req.body
    
    
        const products = [productDetails]
        const totalOriginalPrice = productDetails["originalPrice"]
        const totalOfferdPrice = productDetails["offerdPrice"]

        const newOrder = await Order.create({
            user: user._id , 
            address,
            products,
            totalOfferdPrice,
            totalOriginalPrice
        })
        if(!newOrder){
            throw new ApiError(500,"Order can not be created in database")
        }

        return res.status(200).json(new ApiResponse(200,newOrder,"Order created successfully"))
        
    
    }
)


export const requestCancelation = asyncHandler({

})

export const writeReview = asyncHandler(
    async(req,res)=>{
        const user = req.user
        const{ productId , rating , comment } =req.body
        const{orderId} = req.params
        const order = await Order.findById(orderId)
        const product = await Product.findById(productId)
        if(!product){
            throw new ApiError(400,"Product does not exist database") 
        }
        if(!order){
            throw new ApiError(400,"Order does not exist database")
        }
        const newReview = await Review.create(
            {
                user:user._id,
                order: order._id,
                rating,
                product:productId,
                comment
            }
        )
        if(!newReview){
            throw new ApiError(500,"Review can not be created in database")
        }
        order.review.push(newReview._id)
        await order.save()
        return res.status(200).json(new ApiResponse(200,newReview,"Review created successfully"))
    }
)