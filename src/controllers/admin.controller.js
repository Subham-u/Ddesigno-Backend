import { asyncHandler } from "../utils/asyncHandler.js";
import {
  Attribute,
  Category,
  FeatureIcon,
  Product,
  SubCategory,
} from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { API_STATES } from "../utils/ApiStates.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError("Please Provide Name of the category");
  }

  const isExsitCategory = await Category.findOne({ name });

  if (isExsitCategory) {
    throw new ApiError(API_STATES.CONFLICT, "Category Already");
  }

  const newCategory = await Category.create({
    name,
  });

  if (!newCategory) {
    throw new ApiError(
      "Some Error Occured While Creating Category In database ",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newCategory, "Category Created Successfully"));
});
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, categoryId } = req.body;
  if (!name || !categoryId) {
    throw new ApiError(400, "Please Provide Required Details");
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(400, "Category Not Found");
  }
  const subCategory = await SubCategory.create({
    name,
    parentCategory: category._id,
  });
  if (!subCategory) {
    throw new ApiError(
      "Some Error Occured While Creating SubCategory In database ",
    );
  }
  category.subCategories.push(subCategory);
  await category.save();
  return res
    .status(200)
    .json(
      new ApiResponse(200, subCategory, "SubCategory Created Successfully"),
    );
});
export const createFeatureIcon = asyncHandler(async (req, res) => {
  const { icon, description } = req.body;
  if (!icon || !description) {
    throw new ApiError("Please Provide Name of the category");
  }
  const newFeatureIcon = await FeatureIcon.create({
    icon,
    description,
  });
  if (!newFeatureIcon) {
    throw new ApiError(
      "Some Error Occured While Creating FeatureIcon In database ",
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, newFeatureIcon, "Feature Icon Created Successfully"),
    );
});
export const createAttribute = asyncHandler(async (req, res) => {
  const { name, values } = req.body;
  if (!name || !values) {
    throw new ApiError(400, "Please Provide Required Details");
  }

  const newAttribute = await Attribute.create({
    name,
    values,
  });
  if (!newAttribute) {
    throw new ApiError(
      "Some Error Occured While Creating SubCategory In database ",
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, newAttribute, "SubCategory Created Successfully"),
    );
});

export const listProduct = asyncHandler(async (req, res) => {
  console.log("hello");
  const {
    name,
    description,
    category,
    subCategory,
    attributes,
    features,
    attributeVariants,
    price,
    stock,
    images,
  } = req.body;

  console.log(req.body);

  if (!name) {
    throw new ApiError(400, "Please Provide Required Details");
  }

  const newProduct = await Product.create({
    name,
    description,
    category,
    subCategory,
    attributes,
    features,
    attributeVariants,
    price,
    stock,
    images,
  });

  if (!newProduct) {
    throw new ApiError(
      "Some Error Occured While Creating SubCategory In database ",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newProduct, "SubCategory Created Successfully"));
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().populate("subCategories", "name");
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Category got Successfully"));
});

export const getCategoriesById = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const categories = await Category.findById(categoryId).populate(
    "subCategories",
    "name",
  );
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Category got Successfully"));
});

export const getAtributes = asyncHandler(async (req, res) => {
  const attributes = await Attribute.find();
  return res
    .status(200)
    .json(new ApiResponse(200, attributes, "attributes got Successfully"));
});

export const getAtributeById = asyncHandler(async (req, res) => {
  const { attributeId } = req.params;
  const attributes = await Attribute.findById(attributeId);
  return res
    .status(200)
    .json(new ApiResponse(200, attributes, "attributes got Successfully"));
});

export const getSubCategories = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const subCatagories = await SubCategory.find({
    parentCategory: categoryId,
  }).populate("parentCategory", "name");
  return res
    .status(200)
    .json(
      new ApiResponse(200, subCatagories, "SubCategory Created Successfully"),
    );
});

export const getFeatureIcons = asyncHandler(async (req, res) => {
  const featureIcons = await FeatureIcon.find();
  return res
    .status(200)
    .json(new ApiResponse(200, featureIcons, "attributes got Successfully"));
});

export const getFeatureIconById = asyncHandler(async (req, res) => {
  const { featureIconId } = req.params;
  const featureIcon = await FeatureIcon.findById(featureIconId)
  return res
    .status(200)
    .json(
      new ApiResponse(200, featureIcon, "SubCategory Created Successfully"),
    );
});
