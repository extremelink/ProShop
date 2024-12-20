import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req,res)=>{
    const products  = await Product.find({});
    res.send(products)

})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req,res)=>{
    const { id }= req.params;
    const product = await Product.findById(id);
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Resource Not Found!!');
    }
})

export { getProducts, getProductById };