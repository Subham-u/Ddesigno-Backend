import { Router } from "express";

import { getProductById } from "../controllers/product.controller.js";

const router = Router();
 router.route('/get-product-by-id/:productId').get(getProductById)
export default router