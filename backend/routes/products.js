import express from 'express';
import fetchuser from './fetchuser.js';
import Products from '../models/Products.js';
import Purchase from '../models/Purchase.js';
import { body, validationResult } from 'express-validator';

const productsRouter = express.Router();


productsRouter.get('/getproducts/:category' , async (req, res) => {
  try {
    // get all products, newest first
    const {category} = req.params
    let products;
    if(category === "all"){
       products = await Products.find().sort({ createdAt: -1 });
    }
    else{
       products = await Products.find({category}).sort({ createdAt: -1 });
    }
    return res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


productsRouter.post('/addproduct', fetchuser, [
  body('name', 'Product name is required').trim().notEmpty(),
  body('price', 'Price must be a positive number').isFloat({ min: 0 }),
  body('category', 'Category is required').trim().notEmpty(),
  body('description', 'Description is required').trim().notEmpty(),
  body('brand', 'Brand is required').trim().notEmpty(),
  body('location', 'Location is required').trim().notEmpty(),
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, price, category, description, brand, location } = req.body;
    const userId = req.user.id;
    let {images} = req.body;

    if(images.length == 0){
      images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzsf5YV8SmWdxTzRT5kymFn3nGC8NbAszFJw&s"]
    }
    // Create new product
    const newProduct = new Products({
      name,
      price,
      category,
      description,
      brand,
      location,
      images,
      sellerId: userId,
    });

    // Save to database
    const savedProduct = await newProduct.save();
    
    return res.json({ success: true, product: savedProduct });

  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});






// GET /api/products/sold - Get products sold by the authenticated user
productsRouter.get('/sold', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Products.find({ sellerId: userId }).sort({ createdAt: -1 });
    return res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching sold products:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// GET /api/products/bought - Get products bought by the authenticated user
// Assuming you have a Purchase model or similar; adjust based on your schema
// productsRouter.get('/bought', fetchuser, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     // Example: if you have a Purchase model with buyerId
//     const purchases = await Products.find({ buyerId: userId }).populate('productId');
//     const products = purchases.map(p => p.productId);
//     return res.json({ success: true, products });
//   } catch (error) {
//     console.error('Error fetching bought products:', error);
//     return res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });



// GET /api/products/sold - Get products sold by the authenticated user
productsRouter.get('/sold', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Products.find({ sellerId: userId }).sort({ createdAt: -1 });
    return res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching sold products:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// GET /api/products/bought - Get products bought by the authenticated user
productsRouter.get('/bought', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    // Assuming Purchase model exists
    const purchases = await Purchase.find({ buyerId: userId }).populate('productId');
    const products = purchases.map(p => p.productId);
    return res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching bought products:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// GET /api/products/getproduct/:id - Get single product (for editing)
productsRouter.get('/getproduct/:id', fetchuser, async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    // Check if user owns the product
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    return res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// PUT /api/products/updateproduct/:id - Update product
productsRouter.put('/updateproduct/:id', fetchuser, [
  body('name', 'Product name is required').trim().notEmpty(),
  body('price', 'Price must be a positive number').isFloat({ min: 0 }),
  body('category', 'Category is required').trim().notEmpty(),
  body('description', 'Description is required').trim().notEmpty(),
  body('brand', 'Brand is required').trim().notEmpty(),
  body('location', 'Location is required').trim().notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    // Check if user owns the product
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const { name, price, category, description, brand, location, images } = req.body;
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { name, price, category, description, brand, location, images },
      { new: true }
    );

    return res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


import mongoose from "mongoose";

productsRouter.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ check valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid product ID",
      });
    }

    // 2️⃣ find product
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    // 3️⃣ ownership check
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized",
      });
    }

    // 4️⃣ delete
    await Products.findByIdAndDelete(id);

    // 5️⃣ SEND RESPONSE ✅
    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
export default productsRouter;