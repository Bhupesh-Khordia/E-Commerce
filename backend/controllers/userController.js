import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Login
const loginUser = async (req, res) => {
    try {
        
        const {email, password} = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required." });
        }

        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({ success : false, message : "User does not exist."});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({success : false, message : "Invalid credentials."});
        }

        const token = createToken(user._id);

        return res.json({success : true, token});


    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : error.message});
    }
}

// Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required." });
        }

        // Check if email already exists in database.
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Account already exists." });
        }

        // Check if email is valid.
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email." });
        }

        // Check if password is strong enough.
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (at least 8 characters)." });
        }

        // Hash password.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // Add user in model.
        const user = await newUser.save();

        // Create Token for user to let them log in
        const token = createToken(user._id);

        return res.json({ success: true, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}



// Admin Login
const adminLogin = (req, res) => {
    try {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({success : true, token});
        } else {
            res.json({success : false, message : "Invalid Credentials."})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message});
    }
}

export {loginUser, registerUser, adminLogin}