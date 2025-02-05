import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Login
const loginUser = (req, res) => {

}


// Register
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Check if email already exists in database.
        const exists = await userModel.findOne({email});
        if(exists) {
            res.json({success : false, message : "Account already exists."});
        }

        // Check if email is valid.
        if(!validator.isEmail(email)) {
            res.json({success : false, message : "Please enter valid email."});
        }

        // Check if password is strong enough.
        if(password.length < 8) {
            res.json({success : false, message : "Please enter a strong password."});
        }

        // Hash password.
        const salt = await bcrypt.genSalt(10); // Size 10
        const hashedPassword = await bcrypt.hash(password, salt);


        // Create new user
        const newUser = new userModel({
            name, 
            email,
            password : hashedPassword
        })

        // Add user in model.
        const user = await newUser.save();

        // Create Token for user to let him login
        const token = createToken(user._id);


        res.json({success : true, token});


    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


// Admin Login
const adminLogin = (req, res) => {
    
}

export {loginUser, registerUser, adminLogin}