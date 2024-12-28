import mongoose, { Schema, Types } from "mongoose";
// Attribute Schema
const AttributeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Attribute name, e.g., "Size", "Color"
  values: [{ type: String, required: true }], // Possible values, e.g., ["Small", "Medium", "Large"] for "Size"
});

const FeatureIconSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  description: { type: String, required: true },
});
// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name, e.g., "T-shirt"
  description: { type: String, required: true }, // Product description
  features: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeatureIcon",
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }, // Category reference
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  }, // SubCategory reference
  attributes: [
    {
      attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
        required: true,
      }, // Reference to global attribute
      values: [{ type: String, required: true }], // Selected values for this product
    },
  ],
  attributeVariants: [
    {
      // Combination of attribute values (e.g., Size: Medium, Color: Red)
      variantCombination: [
        {
          attribute: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attribute",
            required: true,
          }, // Attribute reference
          value: { type: String, required: true },
        }, // Specific value, e.g., "Medium", "Red"
      ],
      images: [{ type: String }],
      stock: { type: Number, required: true }, // Images specific to this variant combination
    },
  ],
  price: { type: Number, required: true }, // Base price of the product
  stock: { type: Number, required: true }, // Total stock count
  images: [{ type: String }], // General images for the product
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Category Schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Clothing"
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }], // Subcategories under this category
});

// SubCategory Schema
const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Men"
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }, // Reference to parent Category
});
ProductSchema.index({ name: "text", tags: "text" });
ProductSchema.index({ category: 1, isbestSeller: -1 });

// Models
const Attribute = mongoose.model("Attribute", AttributeSchema);
const Product = mongoose.model("Product", ProductSchema);
const Category = mongoose.model("Category", CategorySchema);
const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
const FeatureIcon = mongoose.model("FeatureIcon", FeatureIconSchema);

export { Attribute, Product, Category, SubCategory, FeatureIcon };
