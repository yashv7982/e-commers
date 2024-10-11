import express from "express";
import { ListProduct, RemoveProduct, AddProduct, SingleProduct } from '../Controllers/ProductController.js';
import upload from "../Middleware/Multer.js";
import adminAuth from "../Middleware/AdminAuth.js";

const productRouter = express.Router();

// Add a product with multiple images
productRouter.post('/add',adminAuth, upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), AddProduct);

// Remove a product by ID
productRouter.delete('/remove/:id', adminAuth, RemoveProduct);


// Get a single product by ID
productRouter.get('/single/:id', SingleProduct);

// List all products
productRouter.get('/list', ListProduct);

export default productRouter;
