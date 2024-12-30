import { Router } from "express";
import {
  createAttribute,
  createCategory,
  createFeatureIcon,
  createSubCategory,
  getAtributeById,
  getAtributes,
  getCategories,
  getCategoriesById,
  getFeatureIconById,
  getFeatureIcons,
  getSubCategories,
  listProduct,
} from "../controllers/admin.controller.js";
const router = Router();

router.route("/create-category").post(createCategory);
router.route("/create-subcategory").post(createSubCategory);
router.route("/create-attribute").post(createAttribute);
router.route("/list-product").post(listProduct);
router.route("/create-feature-icon").post(createFeatureIcon);
router.route("/get-categories").get(getCategories);
router.route("/get-attributes").get(getAtributes);
router.route("/get-subcategories/:categoryId").get(getSubCategories);
router.route("/get-category-by-id/:categoryId").get(getCategoriesById);
router.route("/get-attribute-by-id/:attributeId").get(getAtributeById);
router.route("/get-feature-icons").get(getFeatureIcons);
router.route("/get-feature-icon-by-id/:featureIconId").get(getFeatureIconById);
export default router;
