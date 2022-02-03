import express from 'express'
import product from './data/products.js'
import dotenv  from 'dotenv'

dotenv.config()
const app = express();





app.get('/api/products',(req,res)=>{
    res.json(product);
})

app.get('/api/products/:id',(req,res)=>{
    const prd = product.find((p)=> p._id===req.params.id)
    res.json(prd);
})

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log("Server on port 5000"));