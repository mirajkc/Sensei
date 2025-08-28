import User from "../models/UserModel.js"



//* add new item to the cart
export const addToCart = async (req,res) => {
  try {

    const userId = req.user?._id
    if(!userId){
      return res.status(200).json({
        success : false,
        message : "Error can't find user data please relogin or reload the page"
      })
    }

    const user = await User.findById(userId)
    if(!user){
      return res.status(200).json({
         success : false,
        message : "User not found plese signup"
      })
    }

    const {courseId} = req.params 
    if(!courseId){
      return res.status(200).json({
         success : false,
        message : "Unable to recieve cart data"
      })
    }

    //* check if course already exists in the cart 
    const course = user.cart.some(id => id.toString() === courseId.toString());
    if(course){
      return res.status(200).json({
      success : false,
      message : "Course is already in cart please check out if you like to buy the course"
    })
    }

    user.cart.push(courseId)
    await user.save()
    res.status(200).json({
      success  : true,
      message : `ssucessfully added to cart`
    })
  } catch (error) {
    console.log(error.message);
     return res.status(500).json({
        success : false,
        message : `Server error ${error.message}`
      })
  }
}

//* remove the item from the cart
export const removeFromCart = async(req,res) => {
  try {

    const userId = req.user?._id
    if(!userId){
      return res.status(200).json({
        success : false,
        message : "Error can't find user data please relogin or reload the page"
      })
    }

    const user = await User.findById(userId)
    if(!user){
      return res.status(200).json({
         success : false,
        message : "User not found plese signup"
      })
    }

    const {courseId} = req.params 
    if(!courseId){
      return res.status(200).json({
         success : false,
        message : "Unable to recieve cart data"
      })
    }

    //* check if course already exists in the cart 
    const course = user.cart.some(id => id.toString() === courseId.toString());
    if(!course) {
      return res.status(200).json({
        success : false,
        message : "Product is not added in cart"
      })
    }
    //* if produxt exist in the cart remove it
    const result = await User.findByIdAndUpdate(userId, { $pull: { cart: courseId } }, { new: true });
    if(!result){
      return res.status(200).json({
        success : false,
        message : "Error deleting the item from cart"
      })
    }
     return res.status(200).json({
        success : true,
        message : "Item removed from cart successfully"
      })
  } catch (error) {
    return res.status(500).json({
        success : false,
        message :  `Server error ${error.message}`
      })
  }
}

//* fetch the cart details 
export const getCartDetails = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Error: can't find user data. Please relogin or reload the page."
      });
    }

    const user = await User.findById(userId).populate('cart', 'title price discountedPrice thumbnail');
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found, please signup."
      });
    }

    const totalCartItems = user.cart.length;

    const { totalCartAmount, discountedAmount } = user.cart.reduce(
      (acc, course) => {
        acc.totalCartAmount += course.price || 0;
        acc.discountedAmount += course.discountedPrice || 0;
        return acc;
      },
      { totalCartAmount: 0, discountedAmount: 0 }
    );

    res.status(200).json({
      success: true,
      totalCartAmount,
      totalCartItems,
      discountedAmount,
      cartItems: user.cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

