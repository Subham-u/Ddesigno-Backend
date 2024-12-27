import { asyncHandler } from "../utils/asyncHandler.js";
import { Attribute, Category, FeatureIcon, Product, SubCategory } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



export const createCategory = asyncHandler(
    async (req,res)=> {
        const {name} = req.body
        if(!name){
           
            throw(new ApiError('Please Provide Name of the category'))
        
        }
        const newCategory = await Category.create({
            name,

        })
        if(!newCategory){
            throw(new ApiError('Some Error Occured While Creating Category In database '))
        }
        return res.status(200).json( new ApiResponse(200,newCategory,"Category Created Successfully") )
        
    }
)
export const createSubCategory = asyncHandler(
    async (req,res)=> {
        const {name , categoryId} = req.body
        if(! name || ! categoryId){
           
            throw(new ApiError(400,"Please Provide Required Details"))
        
        }
        const category = await Category.findById(categoryId)
        if(!category){
            throw(new ApiError(400,"Category Not Found"))
        }
        const subCategory = await SubCategory.create({
            name,
            parentCategory: category._id
        })
        if(!subCategory){
            throw(new ApiError("Some Error Occured While Creating SubCategory In database "))
        }
        category.subCategories.push(subCategory)
        await category.save()
        return res.status(200).json( new ApiResponse(200,subCategory,"SubCategory Created Successfully") )
        
    }
)
export const createFeatureIcon = asyncHandler(
    async(req,res)=>{
        const {icon , description} = req.body
        if(!icon || ! description){
           
            throw(new ApiError('Please Provide Name of the category'))
        
        }
        const newFeatureIcon = await FeatureIcon.create({
            icon,
            description

        })
        if(!newFeatureIcon){
            throw(new ApiError('Some Error Occured While Creating FeatureIcon In database '))
        }
        return res.status(200).json( new ApiResponse(200,newFeatureIcon,"Feature Icon Created Successfully") )
    }
)
export const createAttribute = asyncHandler(
    async (req,res)=> {
        const {name , values} = req.body
        if(! name || ! values){
           
            throw(new ApiError(400,"Please Provide Required Details"))
        
        }
       
        const newAttribute = await Attribute.create({
            name,
            values
        })
        if(!newAttribute){
            throw(new ApiError("Some Error Occured While Creating SubCategory In database "))
        }
        
       
        return res.status(200).json( new ApiResponse(200,newAttribute,"SubCategory Created Successfully") )
        
    }

)
export const listProduct = asyncHandler(
    async (req,res)=> {
        const {name , description , category , subCategory , attributes , features , attributeVariants , price , stock , images } = req.body
        if(! name){
           
            throw(new ApiError(400,"Please Provide Required Details"))
        
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
            images


        })
        if(!newProduct){
            throw(new ApiError("Some Error Occured While Creating SubCategory In database "))
        }
        
       
        return res.status(200).json( new ApiResponse(200,newProduct,"SubCategory Created Successfully") )
        
    }

)