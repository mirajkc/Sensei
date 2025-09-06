import fs from "fs";
import Seller from "../models/SellerModel.js";
import cloudinary from 'cloudinary';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { log } from "console";
import User from "../models/UserModel.js";
import Course from "../models/CourseModel.js";

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
        message: "Seller already exists, please log in instead"
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

// * Get seller details by seller ID (middleware ensures req.seller exists)
export const getSellerDetailsBySellerId = async (req, res) => {
  try {
    const sellerId = req.seller?._id;

    if (!sellerId) {
      return res.status(200).json({
        success: false,
        message: "Unable to retrieve seller data. Please reload or relogin.",
      });
    }

    // * Check if the seller exists in the database
    const seller = await Seller.findById(sellerId) 
    if (!seller) {
      return res.status(200).json({
        success: false,
        message: "Seller profile not found. Please create your seller account first.",
      });
    }

    return res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    console.error("Error fetching seller details:", error);
    return res.status(200).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};


//* update the seller details 
export const updateSellerDetails = async (req, res) => {
  try {
    const sellerId = req.seller?._id;

    if (!sellerId) {
      return res.status(200).json({
        success: false,
        message: "Unable to retrieve seller data. Please reload or relogin.",
      });
    }

    // * Find seller in DB
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(200).json({
        success: false,
        message: "Seller profile not found. Please create your seller account first.",
      });
    }

    //* get data from client
    const {
      name,
      oldPassword,
      newPassword1,
      newPassword2,
      bio,
      specialization,
      qualification,
      experience,
      location,
      contactNumber,
      website,
      linkedin,
      github,
      twitter,
      youtube,
    } = req.body;

    if (name?.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Name cannot be empty.",
      });
    }

    let imageUrl = seller.image;

    //* Handle image upload if new image provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Sensei_all_images",
        use_filename: true,
        unique_filename: false,
      });
      fs.unlinkSync(req.file.path);
      imageUrl = result.secure_url;
    }

    //* Handle password change
    if (newPassword1 && newPassword1.length > 0) {
      const isMatch = await bcrypt.compare(oldPassword, seller.password);
      if (!isMatch) {
        return res.status(200).json({
          success: false,
          message: "Incorrect old password.",
        });
      }

      if (newPassword1 !== newPassword2) {
        return res.status(200).json({
          success: false,
          message: "New passwords do not match.",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword1, 10);
      seller.password = hashedPassword;
    }

    //* Update other fields
    seller.name = name || seller.name;
    seller.image = imageUrl;
    seller.bio = bio || seller.bio;
    seller.specialization = specialization || seller.specialization;
    seller.qualification = qualification || seller.qualification;
    seller.experience = experience || seller.experience;
    seller.location = location || seller.location;
    seller.contactNumber = contactNumber || seller.contactNumber;

    seller.socialLinks = {
      website: website || seller.socialLinks.website,
      linkedin: linkedin || seller.socialLinks.linkedin,
      github: github || seller.socialLinks.github,
      twitter: twitter || seller.socialLinks.twitter,
      youtube: youtube || seller.socialLinks.youtube,
    };

    await seller.save();

    res.status(200).json({
      success: true,
      message: "Information updated successfully",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* logout the seller 
export const sellerLogout = async (req, res) => {
  try {
    const sellerId = req.seller?._id;
    if (!sellerId) {
      return res.status(200).json({
        success: false,
        message: "Seller not authenticated. Please relogin or reload the page."
      });
    }

    //* Clear cookie with same options used while setting
    res.clearCookie("sellerToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true
    });

    return res.status(200).json({
      success: true,
      message: "Successfully logged out"
    });

  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

//* like the seller profile
export const likeSellerById = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const userId = req.user?._id;

    if (!sellerId) {
      return res.status(200).json({ success: false, message: "Unable to retrieve the seller data" });
    }

    if (!userId) {
      return res.status(200).json({ success: false, message: "You must be logged in to like" });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(200).json({ success: false, message: "Seller not found" });
    }

    //* Check if user already liked
    const alreadyLiked = seller.like.some(id => id.toString() === userId.toString());
    if (alreadyLiked) {
      return res.status(200).json({ success: false, message: "You have already liked the seller" });
    }

    //* Remove from dislikes if user had disliked before
    seller.dislike = seller.dislike.filter(id => id.toString() !== userId.toString());

    //* Add to likes
    seller.like.push(userId);

    await seller.save();

    return res.status(200).json({ success: true, message: "Like added for seller" });

  } catch (error) {
    return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};

//* dislike the seller
export const dislikeSellerById = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const userId = req.user?._id;

    if (!sellerId) {
      return res.status(200).json({ success: false, message: "Unable to retrieve the seller data" });
    }

    if (!userId) {
      return res.status(200).json({ success: false, message: "You must be logged in to dislike" });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(200).json({ success: false, message: "Seller not found" });
    }

    // *Check if user already disliked
    const alreadyDisliked = seller.dislike.some(id => id.toString() === userId.toString());
    if (alreadyDisliked) {
      return res.status(200).json({ success: false, message: "You have already disliked the seller" });
    }

    // *Remove from likes if user had liked before
    seller.like = seller.like.filter(id => id.toString() !== userId.toString());

    //* Add to dislikes
    seller.dislike.push(userId);

    await seller.save();

    return res.status(200).json({ success: true, message: "Dislike added for seller" });

  } catch (error) {
    return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};


//* get the seller details for the UI

export const getSellerDetailsForUI = async (req, res) => {
  try {
    const { sellerId } = req.params;
    

    if (!sellerId) {
      return res.status(200).json({
        success: false,
        message: "Unable to retrieve the seller data"
      });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(200).json({
        success: false,
        message: "Seller not found"
      });
    }

    //* Calculate total likes and dislikes
    const totalLike = seller.like.length;
    const totalDislike = seller.dislike.length;

    //* Calculate rating (0-5 scale)
    const totalVotes = totalLike + totalDislike;
    const rating = totalVotes > 0 ? (totalLike / totalVotes) * 5 : 0;

    //* Get total courses created by seller
    const courses = await Course.find({ seller: sellerId });
    const totalCourses = courses.length;
    return res.status(200).json({
      success: true,
      seller,
      rating,
      totalCourses,
      totalLike,
      totalDislike,
      courses
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`
    });
  }
};