import Course from "../models/CourseModel.js"
import User from "../models/UserModel.js"

//* redeem the coupon code 
export const validateCoupon = async(req,res) => {
  try {
    const {coupon} = req.body
    if(!coupon){
      return res.status(200).json({
        success: false,
        message: "Error! coupon cannot be empty"
      })
    }

    const userId = req.user?._id
    if(!userId){
      return res.status(200).json({
        success : false,
        message : "Error couldnot authenticate user please relogin or reload the page"
      })
    }

    if(coupon !== "FREE"){
      return res.status(200).json({
        success : false,
        message : "Inavlid coupon is applied"
      })
    }

    res.status(200).json({
      success : true,
      message  : "Coupon sucessfully redeemed",
      totalCartAmount : 0
    })

  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
        success : false,
        message : `Server Errpr ${error.message}`
      })
  }
}

//* purchase the items
export const purchaseCourse = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Error: unable to get user details. Please relogin or reload the page"
      });
    }

    const user = await User.findById(userId).populate('enrolledCourses.course');
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found in the database. Please make sure you have signed up."
      });
    }

    const { totalCartAmount, courseId } = req.body;
    if (totalCartAmount !== 0) {
      return res.status(200).json({
        success: false,
        message: "Please use coupon FREE to get all courses for free"
      });
    }

    if (!courseId || !courseId.length) {
      return res.status(200).json({
        success: false,
        message: "Cart cannot be empty. Make sure to add some courses in the cart"
      });
    }

    const courseSet = new Set(courseId);

    for (const id of courseSet) {
      const enrolledCourse = user.enrolledCourses.find(e => e.course._id.toString() === id);
      if (enrolledCourse) {
        return res.status(200).json({
          success: false,
          message: `You have already purchased the course "${enrolledCourse.course.title}". Please remove it from the cart.`
        });
      } else {
        user.enrolledCourses.push({
          course: id,
          progress: 0,
          completed: false,
          createdAt: Date.now()
        });
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "You have successfully purchased the course(s)"
    });

    user.cart = []
    await user.save()

  } catch (error) {
    res.status(200).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};


