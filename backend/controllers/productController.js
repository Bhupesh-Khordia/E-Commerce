import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";

// Function to Add Products
const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 &&  req.files.image2[0];
        const image3 = req.files.image3 &&  req.files.image3[0];
        const image4 = req.files.image4 &&  req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => (item !== undefined));

        // Since we can't store images in database, we will convert them to link using cloudinary.
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type : 'image'});
                return result.secure_url
            })
        )

        const productData = {
            name, 
            description, 
            category, 
            price : Number(price),
            subCategory, 
            bestseller : bestseller === "true" ? true : false,
            sizes : JSON.parse(sizes),
            image : imagesUrl,
            date : Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();
        

        res.json({ success : true, message : "Product Added Successfully."});
        
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
}

// Function to list Products
const listProducts = async (req, res) => {
    
}

// Function to remove product
const removeProduct = async (req, res) => {
    
}

// Function for single product info
const singleProduct = async (req, res) => {
    
}

export {addProduct, listProducts, removeProduct, singleProduct}