import express from "express";
import { loginUser, registerUser, adminLogin } from "../Controllers/userController.js";

const app = express();
app.use(express.json());

app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/admin', adminLogin);

export default app;
