import express from 'express';
import fetchuser from './fetuser';
import Products from '../models/Products';


const productsRouter = express.Router();


productsRouter.get('/getproduct', fetchuser, (req, res) => {
    try {
        const products = Products
    } catch (error) {

    }
})