import fs from "fs";
import Seller from "../models/SellerModel.js";
import cloudinary from 'cloudinary';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const sellerSignUp = async (req, res) => {
  try {
    const { name, password, password1, email } = req.body;

    if (!name || !password || !password1 || !email) {
      return res.status(200).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (password !== password1) {
      return res.status(200).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    const seller = await Seller.findOne({ email });
    if (seller) {
      return res.status(200).json({
        success: false,
        message: "User already exists, please log in instead"
      });
    }

    if (!req.file) {
      return res.status(200).json({
        success: false,
        message: "Profile picture is required"
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'Sensei_all_images',
      use_filename: true,
      unique_filename: false,
    });

    fs.unlinkSync(req.file.path);
    const imageUrl = result.secure_url;

    const hashPassword = await bcrypt.hash(password, 10);

    const data = await Seller.create({
      name,
      email,
      password: hashPassword,
      image: imageUrl
    });

    if (!data) {
      return res.status(200).json({
        success: false,
        message: "Update to database failed"
      });
    }

    const sellerToken = jwt.sign({ id: data._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("sellerToken", sellerToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Sign-up successful"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

//* seller login 

//* check if user exists or not 
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "All fields are required"
      });
    }

    //* check if user exists
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(200).json({
        success: false,
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(password, seller.password);
    if (!match) {
      return res.status(200).json({
        success: false,
        message: "Incorrect password"
      });
    }

    const sellerToken = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("sellerToken", sellerToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: `Welcome back ${seller.name}`
    });

  } catch (error) {
    res.status(200).json({
      success: false,
      message: `Some error occurred: ${error.message}`
    });
  }
}
