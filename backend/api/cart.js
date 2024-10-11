import express from 'express';
import { addToCart, getUserCart, UpdateCart } from '../Controllers/CartController.js';
import authUser from '../Middleware/Auth.js';

const app = express();
app.use(express.json());

app.post('/get', authUser, getUserCart);
app.post('/add', authUser, addToCart);
app.post('/update', authUser, UpdateCart);

export default app;
