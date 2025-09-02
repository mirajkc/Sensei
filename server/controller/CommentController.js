import Course from "../models/CourseModel.js"
import User from "../models/UserModel.js"


export const addNewComment = async(req,res) => {
  try {

    const userId = req.user?._id
    if(!userId){
      return res.status(200).json({
        success : false,
        message : "Error! coulldnot authenticate user please relogin or reload the page "
      })
    }

    //* get the user details 
    const user = await User.findById(userId).populate("enrolledCourses.course")
    if(!user){
      return res.status(200).json({
        success : false,
        message : "User not found please make sure you are sign up in the website"
      })
    }

    //* get the course details from params 
    const {courseId} = req.params
    if(!courseId){
      return res.status(200).json({
        success : false,
        message : "Unable to retieve the course detail"
      })
    }

    //* get the course detals from db 
    const course = await Course.findById(courseId)
    if(!course){
      return res.status(200).json({
        success : false,
        message : "Unable to retieve the course detail"
      })
    }

    //* check if the student is enrolled in particular course or not
    const enrolledStatus = user.enrolledCourses.some(
    ec => ec.course._id.toString() === courseId.toString()
    );

    if(!enrolledStatus){
      return res.status(200).json({
        success : false,
        message : "You are not elligible to comment please enroll in this course to leave a review"
    })
  }else{
    const {comment} = req.body
    if(!comment || comment.length === 3 ){
      return res.status(200).json({
        success : false,
        message : "Comment should be greate than 4 words"
    })
    }
    //* push thwe comment 
    course.comments.push({
      user : userId,
      comment ,
      createdAt  : Date.now()
    })

    await course.save()
  }

  res.status(200).json({
    success : true,
    message : "Comment updated successfully"
  })

    
  } catch (error) {
    console.log(error.message);
    res.status(200).json({
      success : false,
      message : `Server error ${error.message}`
    })
  }
}

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