import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { addAddress, addItemToCart, addToWishlist, deleteAddress, deleteFromWishlist, deleteItemToCart, getCartItems, getwishlistItems } from "../controllers/user.controller.js";
const router = Router();
router.route("/add-item-to-cart").post(authenticate,addItemToCart);
router.route("/add-address").post(authenticate,addAddress);
router.route('/add-to-wishlist').post(authenticate,addToWishlist);
router.route('/delete-from-wishlist/:productId').delete(authenticate,deleteFromWishlist)
router.route('/delete-cart-item/:cartItemId').delete(authenticate,deleteItemToCart)
router.route('/delete-address/:addressId').delete(authenticate,deleteAddress)
router.route('/get-cart-items').get(authenticate,getCartItems)
router.route('/get-wishlist-items').get(authenticate,getwishlistItems)
export default router;