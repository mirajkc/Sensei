import Course from "../models/CourseModel.js"
import fs from 'fs'
import cloudinary from 'cloudinary'
import Seller from "../models/SellerModel.js";
import { error } from "console";

export const addCourse = async (req, res) => {
  try {
    const { title, category, trailer, description, price, discountedPrice,skillLevel,language } = req.body;

    //* check if seller has included all fields
    if (!title || !category || !trailer || !description || !price || !discountedPrice ||!language ||!skillLevel) {
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
      thumbnail: imageUrl,
      language,
      skillLevel
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

//* get all the course data by courseId 
export const getCourseById = async (req, res) => {
  try {
    const sellerId = req.seller._id
    const { courseId } = req.params

    if (!courseId) {
      return res.status(200).json({
        success: false,
        message: "Error !! can't get course info, reload page or relogin"
      })
    }

    //* check if seller exists
    const seller = await Seller.findById(sellerId)
    if (!seller) {
      return res.status(200).json({
        success: false,
        message: "Error !! seller not registered yet, please register first"
      })
    }

    //* check if course exists
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(200).json({
        success: false,
        message: "Error !! course not found in database"
      })
    }

    //* check ownership
    if (course.seller.toString() !== sellerId.toString()) {
      return res.status(200).json({
        success: false,
        message: "Error !! you do not own this course"
      })
    }

    //* success response
    return res.status(200).json({
      success: true,
      message: "Successfully fetched course data",
      course
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Server error: ${error.message}`
    })
  }
}

//* update the course 
export const updateCourse = async (req, res) => {
  try {
    const { title, category, trailer, description, price, discountedPrice, language , skillLevel } = req.body;
    const { courseId } = req.params;
    const sellerId = req.seller._id;

    //* Validate required fields
    if (!title || !category || !trailer || !description || !price || !discountedPrice ||! language || !skillLevel) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is missing",
      });
    }

    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Seller authentication failed",
      });
    }

    //* Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    //* Check ownership
    const ownership = await Course.findOne({ _id: courseId, seller: sellerId });
    if (!ownership) {
      return res.status(403).json({
        success: false,
        message: "You cannot edit this course because you don't own it",
      });
    }

    //* Upload new thumbnail if provided
    let imageUrl = course.thumbnail; // keep old one if no new upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Sensei_all_images",
        use_filename: true,
        unique_filename: false,
      });
      fs.unlinkSync(req.file.path);
      imageUrl = result.secure_url;
    }

    //* Update the course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        title,
        category,
        trailer,
        description,
        price,
        discountedPrice,
        thumbnail: imageUrl,
        language,
        skillLevel
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Update Course Error:", error);
    return res.status(500).json({
      success: false,
      message : `Server error ${error.message}`
    });
  }
};

//* Get all courses of a particular seller have used seller authentication
export const getAllCourseForOneSeller = async (req, res) => {
  try {
    const sellerId = req.seller._id;

    const courses = await Course.find({ seller: sellerId });

    if (courses.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No courses created by seller"
      });
    }

    return res.status(200).json({
      success: true,
      courses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

//* delte a course by the seller Id 
export const deleteCourseById = async (req, res) => {
  try {
    const sellerId = req.seller._id;
    if (!sellerId) {
      return res.status(200).json({
        success: false,
        message: "Error !! seller not authenticated, please relogin or reload the page"
      });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(200).json({
        success: false,
        message: "Error !! seller not found"
      });
    }

    const { courseId } = req.params;
    if (!courseId) {
      return res.status(200).json({
        success: false,
        message: "Error !! courseId is missing, please add a course first"
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(200).json({
        success: false,
        message: "Error !! course not found"
      });
    }

    if (String(course.seller) !== String(sellerId)) {
      return res.status(200).json({
        success: false,
        message: "Error !! you are not the owner of this course"
      });
    }

    //* delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};


//* add the lesson for a particular course
export const addNewLesson = async (req, res) => {
  try {
    //* get the seller id from middleware
    const  sellerId  = req.seller._id;
    if (!sellerId) {
      return res.status(200).json({
        success: false,
        message: "Error !! seller not authenticated, please relogin or reload the page"
      });
    }

    //* verify if seller exists
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(200).json({
        success: false,
        message: "Error !! seller not found"
      });
    }

    //* get courseId
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(200).json({
        success: false,
        message: "Error !! courseId is missing, please add a course first"
      });
    }

    //* verify if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(200).json({
        success: false,
        message: "Error !! course not found"
      });
    }

    //* verify ownership
    if (String(course.seller) !== String(sellerId)) {
      return res.status(200).json({
        success: false,
        message: "Error !! you are not the owner of this course"
      });
    }

    //* validate lesson details
    const { title, description, whatYouWillLearn, lessonDuration, textGuide, videoGuide } = req.body;
    if (!title || !description || !whatYouWillLearn || !lessonDuration || !textGuide) {
      return res.status(200).json({
        success: false,
        message: "Error !! all required fields must be filled"
      });
    }

    //* push new lesson
    course.lessons.push({ title, description, whatYouWillLearn, lessonDuration, textGuide, videoGuide });

    //* save course (pre-save hook updates lessonNumber, totalHours, totalLessons)
    await course.save();

    return res.status(200).json({
      success: true,
      message: `Lesson ${course.totalNumberOfLessons} added successfully`,
      totalLessons: course.totalNumberOfLessons,
      course
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

//* get all lesson for seller
export const getAllLessonByCourseIdForSeller = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!req.seller || !req.seller._id) {
      return res.status(200).json({
        success: false,
        message: "Error !! seller not authenticated"
      });
    }

    const sellerId = req.seller._id;

    //* Verify seller owns the course and get lessons
    const course = await Course.findOne({ _id: courseId, seller: sellerId });

    if (!course) {
      return res.status(200).json({
        success: false,
        message: "Error !! course not found or you are not authorized"
      });
    }

    return res.status(200).json({
      success: true,
      lessons: course.lessons
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};


//* controller to get all lesson data by lessonId 
//* Controller to get all lesson data by lessonId 
export const getLessonDetailById = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params

    if (!courseId || !lessonId) {
      return res.status(400).json({
        success: false,
        message: "Error !! courseId or lessonId is missing"
      })
    }

    //* Find the course first
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      })
    }

    //* Find the lesson inside the course.lessons array
    const lesson = course.lessons.id(lessonId) 
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found, please provide valid lessonId"
      })
    }

    res.status(200).json({
      success: true,
      lesson
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error !! ${error.message}`
    })
  }
}


//* controller to edit the lesson  by course id and lesson id 
export const editLessonById = async (req, res) => {
  try {
    const sellerId = req.seller?._id;
    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Seller not authenticated. Please refresh or re-login.",
      });
    }

    const { courseId, lessonId } = req.params;
    if (!courseId || !lessonId) {
      return res.status(400).json({
        success: false,
        message: "Course ID and Lesson ID are required.",
      });
    }

    //* Check if the seller owns the course
    const course = await Course.findOne({ _id: courseId, seller: sellerId });
    if (!course) {
      return res.status(403).json({
        success: false,
        message: "Only the owner can edit lessons.",
      });
    }

    //* Find the lesson inside the course
    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found.",
      });
    }

    //* Destructure request body
    const { title, description, whatYouWillLearn, lessonDuration, textGuide, videoGuide } = req.body;

    //* Update only provided fields
    if (title) lesson.title = title;
    if (description) lesson.description = description;
    if (whatYouWillLearn) lesson.whatYouWillLearn = whatYouWillLearn;
    if (lessonDuration) lesson.lessonDuration = lessonDuration;
    if (textGuide) lesson.textGuide = textGuide;
    if (videoGuide) lesson.videoGuide = videoGuide;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lesson successfully updated.",
      lesson,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* contoller to delete the lesson by Id 
export const deleteLessonById = async (req, res) => {
  try {
    //* Authenticate the seller
    const sellerId = req.seller._id
    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Unable to authenticate seller. Please reload the page or relogin."
      })
    }

    const { courseId, lessonId } = req.params
    if (!courseId || !lessonId) {
      return res.status(400).json({
        success: false,
        message: "Unable to get lesson and course details."
      })
    }

    //* Check if course exists
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or it has been deleted."
      })
    }

    //* Check if lesson exists
    const lesson = course.lessons.id(lessonId)
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found or it has been deleted."
      })
    }

    //* Delete the lesson
    lesson.remove()
    await course.save()

    return res.status(200).json({
      success: true,
      message: "Lesson deleted successfully."
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    })
  }
}

//* get all the courses of all seller to show in the main UI 
export const getAllCourseForUI = async(req,res) => {
  try {
      const courses = await Course.find().populate('seller')
  if(!courses){
    return res.status(200).json({
      success : false,
      message : `Database error ${error.message}`
    })
  }
  res.status(200).json({
    success : true,
    courses
  })
    
  } catch (error) {
    console.log(error.message);
    res.status(200).json({
      success : false,
      message : `Server Error ${error.message}`
    })
  }
}