import express from 'express'
import product from './data/products.js'
import dotenv  from 'dotenv'
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'
import {errorNotFound,errorHandler} from './middleware/errorMiddleware.js'
dotenv.config()
connectDB();
const app = express();
app.use(express.json())



app.use('/api/products',productRoute)
app.use('/api/users',userRoutes)


app.use(errorNotFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log("Server on port 5000"));