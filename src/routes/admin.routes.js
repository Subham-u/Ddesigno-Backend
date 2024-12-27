import { Router } from "express";
import { createAttribute, createCategory, createFeatureIcon, createSubCategory, listProduct } from "../controllers/admin.controller.js";
const router = Router();

router.route('/create-category').post(createCategory)
router.route('/create-subcategory').post(createSubCategory)
router.route('/create-attribute').post(createAttribute)
router.route('/list-product').post(listProduct)
router.route('/create-feature-icon').post(createFeatureIcon)
export default router 
