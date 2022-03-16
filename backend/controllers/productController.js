import asyncHandler from "express-async-handler";
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req,res) => {
    const products = await  Product.find({})

    res.json(products)

})

const getProductById = asyncHandler(async (req,res) => {
    const prd = await Product.findById(req.params.id)
    if(prd){
        res.json(prd);
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
    
})

export {getProducts, getProductById}