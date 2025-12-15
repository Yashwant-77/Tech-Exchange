// All imports are here 
import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'
import connectToMongoDB from './db.js'
import cors from 'cors'

// env Configurations
dotenv.config();

// Initializations
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectToMongoDB();


// Allow frontend to access backend APIs
app.use(cors({ origin: "http://localhost:5173" }))



// Middlewares to use json data in request body
app.use(express.json());

// Routes
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);


app.listen(PORT, () => {
    console.log(`Tech Exchange server is running on http://localhost:${PORT}`)
})