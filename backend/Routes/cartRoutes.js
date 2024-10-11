import express from 'express';
import { addToCart, getUserCart, UpdateCart } from '../Controllers/CartController.js';
import authUser from '../Middleware/Auth.js';

const CartRouter = express.Router();

CartRouter.post('/get', authUser, getUserCart); // Authenticated route
CartRouter.post('/add', authUser, addToCart); // Authenticated route
CartRouter.post('/update', authUser, UpdateCart); // Authenticated route

export default CartRouter;
