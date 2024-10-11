import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./Config/mongodb.js"
import connectCloudinary from "./Config/cloudinary.js"
import userRouter from "./Routes/UserRoutes.js"
import productRouter from "./Routes/ProductRoutes.js"
import CartRouter from "./Routes/cartRoutes.js"

const app = express()
const port = process.env.PORT || 4000


connectDB()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors({
    origin: 'https://e-commers-frotend.vercel.app',  // Replace with your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// api ends

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',CartRouter)


app.get('/',(req,res)=>{
    res.send("api is working")
})

app.listen(port,()=> console.log('Server Started on Port : '+ port)
)
