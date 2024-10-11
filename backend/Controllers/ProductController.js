import {v2 as cloudinary} from "cloudinary"
import productModel from "../Models/productModel.js"
import { trusted } from "mongoose";

// function for add product

// function for adding a product
const AddProduct = async (req, res) => {
    try {
      const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
  
      const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
  
      // Upload images to Cloudinary and get secure URLs
      let imageUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
          return result.secure_url;
        })
      );
  
      console.log(name, description, price, category, subCategory, sizes, bestseller);
      console.log(imageUrl);
  
      // Prepare product data
      const productData = {
        name,
        description,
        category,
        price: Number(price),
        subCategory,
        bestseller: bestseller === "true" ? true : false,
        sizes: JSON.parse(sizes), // Assumed sizes come as a JSON string
        image: imageUrl,
        date: Date.now(),
      };
  
      console.log(productData);
  
      // Save product to the database
      const product = new productModel(productData);
      await product.save();
  
      res.json({ success: true, message: "Product added" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  // Function for listing products
  const ListProduct = async (req, res) => {
    try {
      const products = await productModel.find({});
      res.json({ success: true, products });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  


// function for add product

// Updated RemoveProduct function
const RemoveProduct = async (req, res) => {
  try {
      const { id } = req.params;  // Get the id from params instead of body
      await productModel.findByIdAndDelete(id);
      res.json({ success: true, message: "Product Removed" });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};



// function for add product

const SingleProduct = async (req,res)=>{

    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
}

export {ListProduct,RemoveProduct,AddProduct,SingleProduct}