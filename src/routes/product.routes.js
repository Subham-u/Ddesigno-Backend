import { Router } from "express";

import {
  getProductById,
  getProductBySubCategory,
  getProductsByCategory,
  getTagNames,
} from "../controllers/product.controller.js";

const router = Router();
router.route("/get-product-by-id/:productId").get(getProductById);
router.route("/get-product-by-category/:categoryId").get(getProductsByCategory);
router
  .route("/get-product-by-sub-category/:categoryId/:subcategoryId")
  .get(getProductBySubCategory);
router.route("/get-tag-names").post(getTagNames);
export default router;
