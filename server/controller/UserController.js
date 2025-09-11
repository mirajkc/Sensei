import axios from 'axios';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import fs from 'fs';
import Course from '../models/CourseModel.js';
import mongoose from 'mongoose';
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export const GoogleSignIn = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: "No token provided" });
    }

   
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name, picture, password: null });
    }

    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Logged in successfully", user });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      success: false,
      message: `Error verifying Google login: ${error.message}`,
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
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No Google token provided",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email, password: null });

    if (!user) {
      user = await User.create({
        name,
        picture,
        email,
        password: null,
      });
    }

    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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
      message: `Error during Google login: ${error.message}`,
    });
  }
};

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

//* get the student details by student Id 
export const getStudentDetails = async(req,res) => {
  try {

    const studentId = req.user?._id
    if(!studentId) {
      return res.status(200).json({
        success : false,
        message : "User not authenticated please relogin or reload the page"
      })
    }

    //* check if the user exists in the databse 
    const student = await User.findById(studentId)
    if(!student){
      return res.status(200).json({
        success : false,
        message : "User not found"
      })
    }

    //* if user is found 
    res.status(200).json({
      success : true,
      message : "Successfully fetched student data",
      student
    })
  } catch (error) {
    console.log(error.message);
    
    return res.status(500).json({
        success : false,
        message : `Server error ${error.message}`
      })
  }
}

//* update the student data 
export const updateStudentDetails = async (req, res) => {
  try {
    const studentId = req.user?._id;
    if (!studentId) {
      return res.status(200).json({
        success: false,
        message: "User not authenticated, please relogin or reload the page"
      });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(200).json({
        success: false,
        message: "User not found"
      });
    }

    const {
      name,
      oldPassword,
      newPassword1,
      newPassword2,
      phoneno,
      address,
      bio,
      link,
      linkedin,
      github,
      twitter,
      facebook,
      specialization,
      achievements,
      grade
    } = req.body;

    if (!name) {
      return res.status(200).json({
        success: false,
        message: "Name cannot be empty"
      });
    }

    //* Handle profile image update
    let imageUrl = student.picture; 
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
    if (oldPassword && oldPassword.length > 0) {
      const match = await bcrypt.compare(oldPassword, student.password);
      if (!match) {
        return res.status(200).json({
          success: false,
          message: "Incorrect old password"
        });
      }
      if (newPassword1 !== newPassword2) {
        return res.status(200).json({
          success: false,
          message: "New passwords do not match"
        });
      }
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(newPassword1, salt);
    }

    //* Update other student details
    student.name = name;
    student.phoneno = phoneno || student.phoneno;
    student.address = address || student.address;
    student.bio = bio || student.bio;
    student.link = link || student.link;
    student.picture = imageUrl;
    student.linkedin = linkedin || student.linkedin;
    student.github = github || student.github;
    student.twitter = twitter || student.twitter;
    student.facebook = facebook || student.facebook;
    student.specialization = specialization || student.specialization;
    student.achievements = achievements || student.achievements;
    student.grade = grade || student.grade;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student details updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

//* get all enrolled courses for a particualr user
export const getEnrolledCourses = async(req,res) => {
  try {
    const userId = req.user?._id
    if(!userId){
      return res.status(200).json({
        success : false,
        message : "Error couldnot authenticate user please relogin or reload tha page"
      })
    }
    
    //* get the user details from the database 
    const user  = await User.findById(userId).populate({
      path : "enrolledCourses.course",
      populate:{
        path : 'seller'
      }
    })

    if(!user){
      return res.status(200).json({
        success : false,
        message : "User not found make sure user has signup on the page"
      })
    }

    //* if we sucesfully get the user its enroleed  course course details and seller details
    res.status(200).json({
      success : true,
      enrolledCourses : user.enrolledCourses
    })
  } catch (error) {
    res.status(500).json({
      success : false,
      message : `Server error ${error.message}`
    })
  }
}

//* get total enrolled students for a certain Course
export const getCourseEnrollmentCount = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(200).json({
        success: false,
        message: "Unable to retrieve the course details, please provide a valid course ID",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(200).json({
        success: false,
        message: "Course not found",
      });
    }

    const totalEnrollment = await User.countDocuments({
      "enrolledCourses.course": new mongoose.Types.ObjectId(courseId),
    });

    res.status(200).json({
      success: true,
      totalEnrollment,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

//* get enrolled course details foe a single course
export const getSingleEnrolledCourseDetails = async(req,res) => {
  try {

    // * verify if the user is enrolled or not
    const userId = req.user?._id
    if(!userId){
      return res.status(200).json({
        success : false,
        message : "Unable to authenticate user please relogin or reload the page"
      })
    }

    //* get the user details from the db
    const user = await User.findById(userId).populate({
      path : "enrolledCourses.course",
      populate : {
        path : "seller"
      },
    })

    //* get the course Id from params 
    const {courseId} = req.params
    if(!courseId){
      return res.status(200).json({
        success : false,
        message : "Error unable to get the course details"
      })
    }

    //* get the enrollment details
     const enrolledCourse= user.enrolledCourses.find(item => item.course._id.toString().toLowerCase()
        === courseId.toLowerCase())
     if(!enrolledCourse){
      return res.status(200).json({
      success : false,
      message : "You are not elligible to enroll in this  course"
    })
     }

    res.status(200).json({
      success : true,
      enrolledCourse
    })
     
  } catch (error) {
     return res.status(200).json({
        success : false,
        message : `Server error ${error.message}`
      })
  }
}

//* track the user progress when the user loads the poge 
export const progressTracker = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { courseId, lessonId } = req.params;

    if (!courseId || !lessonId) {
      return res.status(200).json({
        success: false,
        message: "Error! Missing course or lesson details",
      });
    }

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Error! Unable to retrieve user data",
      });
    }

    //* Get user and populate courses
    const user = await User.findById(userId).populate("enrolledCourses.course");
    if (!user) {
      return res.status(200).json({ success: false, message: "User not found" });
    }

    //* Find the enrolled course
    const enrolledCourse = user.enrolledCourses.find(
      (enrolled) => enrolled.course._id.toString() === courseId.toString()
    );
    if (!enrolledCourse) {
      return res.status(200).json({ success: false, message: "Course not found" });
    }

    const totalLessons = enrolledCourse.course.lessons.length;
    const currentLessonIndex = enrolledCourse.course.lessons.findIndex(
      (lesson) => lesson._id.toString() === lessonId.toString()
    );

    if (currentLessonIndex === -1) {
      return res.status(200).json({ success: false, message: "Lesson not found" });
    }

    //* Calculate progress (index +1 so first lesson counts)
    const totalProgressMade = ((currentLessonIndex + 1) / totalLessons) * 100;

  
    //* Update fields
    enrolledCourse.progress = totalProgressMade;
    if(enrolledCourse.progress === 100){
      enrolledCourse.completed = true
      enrolledCourse.completedDate = new Date() 
    }
    enrolledCourse.currentlyIn = lessonId;

    await user.save();

    res.status(200).json({
      success: true,
      progress: enrolledCourse.progress,
      currentLesson: enrolledCourse.currentlyIn,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* api call to get the details printed for certoficat
export const getDetailsForCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?._id;

    

    if (!courseId) {
      return res.status(200).json({
        success: false,
        message: "Error: Missing courseId! Trying to access certificate page directly?",
      });
    }

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Unable to authenticate user",
      });
    }

    //* Fetch user with populated courses and seller
    const user = await User.findById(userId).populate({
      path: "enrolledCourses.course",
      populate: {
        path: "seller",
      },
    });

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    //* Find the specific enrolled course
    /* const enrolledCourse = user.enrolledCourses.find(
      (c) => c.course._id.toString() === courseId
    ); */
    
    const enrolledCourse = user.enrolledCourses.find( item => item.course._id.toString() === courseId.toString())
    
    if (!enrolledCourse) {
      return res.status(200).json({
        success: false,
        message: "User has not enrolled in this course",
      });
    }

    //* Extract details
    const userName = user.name;
    const courseTitle = enrolledCourse.course.title;
    const sellerName = enrolledCourse.course.seller?.name || "Unknown Seller";
    const completionDate = enrolledCourse.completedDate || null;

    const detailss = { userName, courseTitle, sellerName, completionDate };
    res.status(200).json({
      success: true,
      detailss,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* api call to get all the user information for home page
export const greetUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(200).json({
        success: true,
        isVisitor: true
      });
    }

    const user = await User.findById(userId).populate([
      {
        path: "enrolledCourses.course",
        select:
          "title category skillLevel thumbnail price discountedPrice totalHours totalNumberOfLessons",
        populate: {
          path: "seller",
          select: "name image bio specialization rating"
        }
      },
      {
        path: "wishlist",
        select: "title category skillLevel thumbnail price discountedPrice",
        populate: {
          path: "seller",
          select: "name image rating"
        }
      },
      {
        path: "cart",
        select: "title category skillLevel thumbnail price discountedPrice",
        populate: {
          path: "seller",
          select: "name image rating"
        }
      }
    ]);

    res.status(200).json({
      success: true,
      isVisitor: false,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

