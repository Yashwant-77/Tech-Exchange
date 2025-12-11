import express from 'express';
import fetchuser from './fetuser';
import Products from '../models/Products';
import { body, validationResult } from 'express-validator';

const productsRouter = express.Router();


productsRouter.get('/getallproduct' , async (req, res) => {
  try {
    // get all products, newest first
    const products = await Products.find().sort({ createdAt: -1 });
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
  body('img', 'At least one image URL is required').isArray({ min: 1 }),
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, price, category, description, brand, location, images } = req.body;
    const userId = req.user.id; // from fetchuser middleware

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



export default productsRouter;