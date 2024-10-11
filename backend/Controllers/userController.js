import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// route for logiuser
const loginUser = async(req,res)=>{


    try {

        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"User not exists"})
        }
        const isMatch = await bcrypt.compare(password, user.password)


        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"password is wrong"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }



    
}
// route for rigerstation
const registerUser = async(req,res)=>{
    
    try {
        const {name,email,password} = req.body;

    // check user already exist or not
    const exist = await userModel.findOne({email})

    if(exist){
        return res.json({success:false,message:"user already exists"})
    }
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"enter a validate email"})
    }
    if (password.length  < 8 ) {
        return res.json({success:false,message:"password length must be 8 "})
    }

    // hassing userpassword

    const salt = await bcrypt.genSalt(10)
    const hassedPasswrod = await bcrypt.hash(password,salt)

    const newUser = new userModel({
        name,
        email,
        password:hassedPasswrod
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    


}
// route for admim

const adminLogin = async(req,res)=>{

        try {
            
            const {email,password} = req.body
            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
                const token = jwt.sign(email+password,process.env.JWT_SECRET)
                res.json({success:true,token})
            }else{
                res.json({success:false,message:"Invalid email or password"})
            }

        } catch (error) {
            console.log(error);
            res.json({success:false,message:error.message})
        }

}

export {loginUser,registerUser,adminLogin}