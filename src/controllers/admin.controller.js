import { asyncHandler } from "../utils/asyncHandler.js";
import {
  Attribute,
  Category,
  FeatureIcon,
  Product,
  SubCategory,
  Tag,
} from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { API_STATES } from "../utils/ApiStates.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    throw new ApiError("Please Provide Name of the category");
  }

  const isExsitCategory = await Category.findOne({ name });

  if (isExsitCategory) {
    throw new ApiError(API_STATES.CONFLICT, "Category Already");
  }

  const newCategory = await Category.create({
    name,
    image,
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
  const { name, categoryId, image } = req.body;
  if (!name || !categoryId || !image) {
    throw new ApiError(400, "Please Provide Required Details");
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(400, "Category Not Found");
  }
  const subCategory = await SubCategory.create({
    name,
    parentCategory: category._id,
    image,
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
    offerPrice,
    tags,
    reviewRating,
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
    tags,
    offerPrice,
    reviewRating,
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
  const categories = await Category.find().populate("subCategories", [
    "name",
    "image",
  ]);
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
  const featureIcon = await FeatureIcon.findById(featureIconId);
  return res
    .status(200)
    .json(
      new ApiResponse(200, featureIcon, "SubCategory Created Successfully"),
    );
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryid, subcatagoriesid } = req.body;
  if (!categoryid) {
    throw new ApiError("Please povide categoryid");
  }

  const findCategory = await Category.find({ _id: categoryid });

  if (findCategory.length === 0) {
    return res.json(new ApiResponse(400, "category not found"));
  }
  await Category.deleteOne({ _id: categoryid });

  if (subcatagoriesid.length > 0) {
    await SubCategory.deleteMany({ _id: subcatagoriesid });
    return res
      .status(200)
      .json(new ApiResponse(200, "deleted category and subCategory"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, findCategory, "deleted category"));
});

export const deleteFeatureIcon = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new ApiError("Please povide categoryid");
  }

  const findFeaturbyId = await FeatureIcon.findOne({ _id: id });

  if (!findFeaturbyId) {
    return res.json(new ApiResponse(400, "not feature icon found"));
  }
  await FeatureIcon.deleteOne({ _id: id });

  return res.status(200).json(new ApiResponse(200, "deleted feature icon"));
});

export const deleteAttribute = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new ApiError("Please povide categoryid");
  }

  const findAttributebyId = await Attribute.findOne({ _id: id });

  if (!findAttributebyId) {
    return res.json(new ApiResponse(400, "not attributed found"));
  }
  await Attribute.deleteOne({ _id: id });

  return res.status(200).json(new ApiResponse(200, "deleted attributed"));
});

export const createTag = asyncHandler(async (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    throw new ApiError("Please povide categoryid");
  }

  const findTag = await Tag.findOne({ tag });

  if (findTag) {
    return res.json(new ApiResponse(400, "Tag already exists"));
  }

  const data = await Tag.create({ tag });
  return res.status(200).json(new ApiResponse(200, data, "created a new Tag"));
});

export const deleteTag = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new ApiError("Please povide TagId");
  }

  const findTag = await Tag.findOne({ _id: id });

  if (!findTag) {
    return res.json(new ApiResponse(400, "not Tag found"));
  }

  await Tag.deleteOne({ _id: id });
  return res.status(200).json(new ApiResponse(200, "tag successfully deleted"));
});

export const getTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find();
  return res.status(200).json(new ApiResponse(200, tags, "good"));
});
