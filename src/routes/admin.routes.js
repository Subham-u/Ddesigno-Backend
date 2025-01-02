import { Router } from "express";
import {
  createAttribute,
  createCategory,
  createFeatureIcon,
  createSubCategory,
  createTag,
  deleteAttribute,
  deleteCategory,
  deleteFeatureIcon,
  deleteTag,
  getAtributeById,
  getAtributes,
  getCategories,
  getCategoriesById,
  getFeatureIconById,
  getFeatureIcons,
  getSubCategories,
  getTags,
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
router.route("/delete-categorie").post(deleteCategory);
router.route("/delete-feature-icon").post(deleteFeatureIcon);
router.route("/delete-attribute").post(deleteAttribute);
router.route("/create-tag").post(createTag);
router.route("/delete-tag").post(deleteTag);
router.route("/get-tags").get(getTags);
export default router;
