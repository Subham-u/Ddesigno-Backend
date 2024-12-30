import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    throw new ApiError("Please Provide Name of the category");
  }
  const products = await Product.find({
    category: categoryId,
  });
  if (!products) {
    throw new ApiError(
      "Some Error Occured While Creating Category In database ",
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Category Created Successfully"));
});
export const getProductBySubCategory = asyncHandler(async (req, res) => {
  const { categoryId, subcategoryId } = req.params;
  if (!categoryId || !subcategoryId) {
    throw new ApiError("Please Provide Name of the category");
  }
  const products = await Product.find({
    category: categoryId,
    subCategory: subcategoryId,
  });
  if (!products) {
    throw new ApiError(
      "Some Error Occured While Creating Category In database ",
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Category Created Successfully"));
});

export const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    throw new ApiError("Please Provide Name of the category");
  }
  const product = await Product.findById(productId)
    .populate("category", "name") // Populate category name
    .populate("subCategory", "name")
    .populate({ path: "features", select: "icon description" }) // Populate subcategory name
    .populate({
      path: "attributes.attribute",
      select: "name", // Populate attribute name and global values
    })
    .populate({
      path: "attributeVariants.variantCombination.attribute",
      select: "name ",
    });
  if (!product) {
    throw new ApiError(
      "Some Error Occured While Creating Category In database ",
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Category Created Successfully"));
});
