import Course from "../models/CourseModel.js"
import User from "../models/UserModel.js"

//* add the course to the wishlist by user 
export const addWishList = async (req, res) => {
  try {
    const userId = req.user?._id; //* from middleware
    const { courseId } = req.params;

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Unable to get user details, please relogin or reload the page"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Error! User not found, please signup"
      });
    }

    if (!courseId) {
      return res.status(200).json({
        success: false,
        message: "Error! Could not retrieve the course data"
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(200).json({
        success: false,
        message: "Error! Course not found, make sure course exists"
      });
    }

    //* check if course is already in wishlist
    const alreadyInWishlist = await User.findOne({ _id: userId, wishlist: courseId });
    if (alreadyInWishlist) {
      return res.status(200).json({
        success: false,
        message: "Course is already added in wishlist"
      });
    }

    //* add course to wishlist
    user.wishlist.push(courseId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Course added to wishlist"
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Server error ${error.message}`
    });
  }
};

//* remove the course from the wishlist 
export const removeWishList = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Error! Unable to get user details, please relogin or reload the page"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Unable to get user details, please signup"
      });
    }

    const { courseId } = req.params;
    if (!courseId) {
      return res.status(200).json({
        success: false,
        message: "Error! Course ID not provided"
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(200).json({
        success: false,
        message: "Error! Course not found"
      });
    }

    //* check if course is in wishlist
    if (!user.wishlist.includes(courseId)) {
      return res.status(200).json({
        success: false,
        message: "Error! The course is not in your wishlist"
      });
    }

    //* remove course from wishlist
    user.wishlist = user.wishlist.filter(course => course.toString() !== courseId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Course successfully removed from wishlist"
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Server error ${error.message}`
    });
  }
};

//* get all wishlist of a particular user
export const getAllWishList = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Error! Could not get user data, please relogin or reload the page"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const wishlist = user.wishlist;
    if (!wishlist || wishlist.length === 0) {
      return res.status(200).json({
        success: true,
        wishlists: [],
        message: "Your wishlist is empty"
      });
    }

    const wishlists = await Course.find({ _id: { $in: wishlist } }).populate('seller');
    res.status(200).json({
      success: true,
      wishlists
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};
