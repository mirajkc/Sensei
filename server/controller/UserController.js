import axios from 'axios';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import fs from 'fs';

export const GoogleSignIn = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Google signup error. Use email signup instead.",
      });
    }

    // Get access token from Google
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenResponse.data;
    if (!access_token) {
      return res.status(400).json({
        success: false,
        message: "Failed to get access token from Google",
      });
    }

    // Get user info from Google
    const userInfoResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const userInfo = userInfoResponse.data;

    // Check if user exists, if not create
    let user = await User.findOne({ email: userInfo.email });
    if (!user) {
      user = await User.create({
        name: userInfo.name,
        picture: userInfo.picture,
        email: userInfo.email,
        password : null,
      });
    }

    // Create JWT token
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Send cookie
    res.cookie('userToken', userToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error occurred during login: ${error.message}`,
    });
  }
};

//!------------------- Default Server SignUp -------------------//
export const defaultServerSignUP = async (req, res) => {
  try {
    const { name, password, password2, email } = req.body;

    // Validate all required fields
    if (!name || !password || !password2 || !email) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Validate password confirmation
    if (password !== password2) {
      return res.status(400).json({ 
        success: false, 
        message: "Passwords do not match" 
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "Profile picture is required" 
      });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists. Please login" 
      });
    }

    // Upload profile picture to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'Sensei_all_images',
      use_filename: true,
      unique_filename: false,
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    const imageUrl = result.secure_url;

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      picture: imageUrl,
    });

    // Create JWT token
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
      expiresIn: '7d' 
    });

    // Send cookie
    res.cookie('userToken', userToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ 
      success: true, 
      message: "Successfully created user" 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: `Error occurred during signup: ${error.message}`,
    });
  }
}; 


//! login with google 

export const loginWithGoogle = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Unable to receive Google code",
      });
    }

    const tokenresponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenresponse.data;
    if (!access_token) {
      return res.status(400).json({
        success: false,
        message: "Failed to get access token from Google",
      });
    }

    const userInfoResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    const userInfo = userInfoResponse.data;

    let user = await User.findOne({ email: userInfo.email, password: null });

    if (!user) {
      user = await User.create({
        name: userInfo.name,
        picture: userInfo.picture,
        email: userInfo.email,
        password: null,
      });
    }
    const userToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie("userToken", userToken, {
      httpOnly: true,
       secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Successfully logged in with Google",
      user,
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({
      success: false,
      message: `Error occurred during Google login: ${error.message}`,
    });
  }
}

//! default server login 
export const defaultServerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, please sign up instead",
      });
    }

    // Check if it's a Google login account
    if (user.password === null) {
      return res.status(400).json({
        success: false,
        message: "This account is registered with Google. Please log in using Google.",
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    //if password match send cookie to the frontend 
    
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie( "userToken" , userToken , {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    // Successful login
    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      // You can also send a token here if needed
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* logout the user 
export const userLogOut = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "User not authenticated, please relogin or reload the page",
      });
    }

    //* check if the user exists in the database 
    const user = await User.findById(userId);
    if (!user) {  
      return res.status(200).json({
        success: false,
        message: "User not found, please login first",
      });
    }

    //* if user exists in the database 
    res.clearCookie("userToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};
