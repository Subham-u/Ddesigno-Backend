import { FeatureIcon, Product, Tag } from "../models/product.model.js";
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
      "Some Error Occured While Creating Category In database "
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
      "Some Error Occured While Creating Category In database "
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
      select: "name",
    });
  if (!product) {
    throw new ApiError(
      "Some Error Occured While Creating Category In database "
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Category Created Successfully"));
});

export const getTagNames = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new ApiError("Please provide a valid array of Tag IDs", 400);
  }

  const tags = await Tag.find({ _id: { $in: ids } });

  if (!tags.length) {
    return res.status(404).json(new ApiResponse(404, [], "No tags found"));
  }

  const tagNames = tags.map((tag) => tag.tag).filter((tagName) => tagName);

  if (tagNames.length === 0) {
    return res.status(404).json(new ApiResponse(404, [], "No tag names found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tagNames, "Tag names fetched successfully"));
});

export const getFeatureIcons = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new ApiError(
      "Please provide a valid array of feature icons IDs",
      400
    );
  }

  const featureIcons = await FeatureIcon.find({ _id: { $in: ids } });

  if (!featureIcons.length) {
    return res.status(404).json(new ApiResponse(404, [], "No tags found"));
  }

  if (featureIcons.length === 0) {
    return res.status(404).json(new ApiResponse(404, [], "No tag names found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, featureIcons, "Tag names fetched successfully"));
});

export const searchProductsByNameOrDescription = asyncHandler(
  async (req, res) => {
    const { query } = req.body;

    if (!query || typeof query !== "string") {
      throw new ApiError("Please provide a valid search query", 400);
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    if (!products.length) {
      return res
        .status(404)
        .json(new ApiResponse(404, [], "No products found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  }
);
