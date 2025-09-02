import Course from "../models/CourseModel.js"
import User from "../models/UserModel.js"


export const addNewComment = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Error! Could not authenticate user. Please relogin or reload the page."
      });
    }

    // Get user details including enrolled courses
    const user = await User.findById(userId).populate("enrolledCourses.course");
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found. Please make sure you are signed up."
      });
    }

    // Get course ID from params
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(200).json({
        success: false,
        message: "Unable to retrieve the course details."
      });
    }

    const isEnrolled = user.enrolledCourses.some(
      ec => ec.course._id.toString() === courseId.toString()
    );
    if (!isEnrolled) {
      return res.status(200).json({
        success: false,
        message: "You are not eligible to comment. Please enroll in this course first."
      });
    }

    const { comment } = req.body;
    if (!comment || comment.trim().split(" ").length < 4) {
      return res.status(200).json({
        success: false,
        message: "Comment should be greater than 4 words."
      });
    }
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          comments: {
            user: userId,
            comment: comment.trim(),
            createdAt: Date.now()
          }
        }
      },
      { new: true } 
    );

    res.status(200).json({
      success: true,
      message: "Comment added successfully."
    });

  } catch (error) {
    console.error(error.message);
    res.status(200).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

//* api to get all the comments by courseId
export const getAllCommentByCourseId = async(req,res)=>{ 
  try {
    const {courseId} = req.params

    //* check if the course exists or not 
    if(!courseId){
      return res.status(200).json({
        success : false,
        message : "Error could not get the course details"
      })
    }

    const course = await Course.findById(courseId).populate({
      path : "comments",
      populate : {
        path : "user",
      }
    })

    if(!course){
      return res.status(200).json({
        success : false,
        message : "Course not found make sure that that course Id is correct "
      })
    }

    //* send the data to the frontend 

    res.status(200).json({
      success : true,
      course
    })

    
  } catch (error) {
    res.status(200).json({
      success : false,
      message : `Server error ${error.message}`
    })
  }
}