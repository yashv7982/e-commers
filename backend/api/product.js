import express from "express";
import { ListProduct, RemoveProduct, AddProduct, SingleProduct } from '../Controllers/ProductController.js';
import upload from "../Middleware/Multer.js";
import adminAuth from "../Middleware/AdminAuth.js";

const app = express();
app.use(express.json());

app.post('/add', adminAuth, upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), AddProduct);

app.delete('/remove/:id', adminAuth, RemoveProduct);
app.get('/single/:id', SingleProduct);
app.get('/list', ListProduct);

export default app;
