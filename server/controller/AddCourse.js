import Course from "../models/CourseModel.js"
import fs from 'fs'
import cloudinary from 'cloudinary'

export const addCourse = async (req, res) => {
  try {
    const { title, category, trailer, description, price, discountedPrice } = req.body;

    //* check if seller has included all fields
    if (!title || !category || !trailer || !description || !price || !discountedPrice) {
      return res.status(200).json({
        success: false,
        message: "All fields are required"
      });
    }

    //* check if seller has included the thumbnail
    if (!req.file) {
      return res.status(200).json({
        success: false,
        message: "Please upload thumbnail for course"
      });
    }

    //* check if seller exists
    const seller = req.seller._id;
    if (!seller) {
      return res.status(200).json({
        success: false,
        message: "Seller not found"
      });
    }

    //* upload thumbnail to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'Sensei_all_images',
      use_filename: true,
      unique_filename: false,
    });

    fs.unlinkSync(req.file.path);
    const imageUrl = result.secure_url;

    //* create a new course
    const course = await Course.create({
      title,
      category,
      trailer,
      description,
      price,
      discountedPrice,
      seller,
      thumbnail: imageUrl
    });

    res.status(200).json({
      success: true,
      message: "New course created, please add lessons now",
      courseId: course._id
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

//! Logic Flow: When a seller successfully creates a course, the backend returns the courseId in the response. 
//! The frontend navigates the seller to the dynamic EditCourse page (/course/edit/:courseId), where the page 
//! fetches the course details and lessons by ID. The course details are displayed in a form for editing, 
//! and existing lessons are mapped on the page. The seller can update the course via an API call to edit 
//! course details, or add new lessons via an API call to add lessons. After any update, the frontend 
//! fetches the course by ID again to get the updated course and lessons, ensuring the UI is always up-to-date.