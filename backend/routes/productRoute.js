import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
const router = express.Router()


router.get('/',asyncHandler(async (req,res)=>{
    const product = await Product.find({})
    res.json(product);
}))

router.get('/:id',asyncHandler( async (req,res)=>{
    const prd = await Product.findById(req.params.id)
    if(prd){
        res.json(prd);
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
    
}))



export default router