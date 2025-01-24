import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  addAddress,
  addItemToCart,
  addToWishlist,
  checkoutCart,
  checkoutProduct,
  deleteAddress,
  deleteFromWishlist,
  deleteItemToCart,
  getCartItems,
  getwishlistItems,
  writeReview,
  getAdderesss,
  getUserOrders,
} from "../controllers/user.controller.js";

import {
  getCategories,
  getCategoriesById,
  getSubCategories,
} from "../controllers/admin.controller.js";
const router = Router();
router.route("/add-item-to-cart").post(authenticate, addItemToCart);
router.route("/add-address").post(authenticate, addAddress);
router.route("/add-to-wishlist").post(authenticate, addToWishlist);
router
  .route("/delete-from-wishlist/:productId")
  .delete(authenticate, deleteFromWishlist);
router
  .route("/delete-cart-item/:cartItemId")
  .delete(authenticate, deleteItemToCart);
router.route("/delete-address/:addressId").delete(authenticate, deleteAddress);
router.route("/get-cart-items").get(authenticate, getCartItems);
router.route("/get-wishlist-items").get(authenticate, getwishlistItems);
router.route("/check-out-cart").post(authenticate, checkoutCart);
router.route("/check-out-product").post(authenticate, checkoutProduct);
router.route("/get-categories").get(getCategories);
router.route("/get-subcategories/:categoryId").get(getSubCategories);
router.route("/get-category-by-id/:categoryId").get(getCategoriesById);
router.route("/write-review/:orderId").post(authenticate, writeReview);
router.route("/get-address").get(authenticate, getAdderesss);
router.route("/get-user-orders").get(authenticate, getUserOrders);

export default router;
