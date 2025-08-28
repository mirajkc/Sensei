import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  ShoppingCart, 
  Heart, 
  Zap, 
  User, 
} from 'lucide-react'
import toast from 'react-hot-toast'
import useAppContext from '../../context/AppContext.jsx'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const CourseActions = ({ course, theme }) => {
  const { cartItemsDetails ,addCartItem ,removeCartItem , getCartDetails , loading , buyNow , loggedIn} = useAppContext()
  const [wishList , setWishlist] = useState([])
  const courseID = course._id.toString()
  const cartItems = cartItemsDetails.cartItems || []; 
  const isInCart = cartItems.some(item => item._id === courseID);
  const navigate = useNavigate()

  const formatPrice = (price, discountedPrice) => {
    if (discountedPrice && discountedPrice < price) {
      return {
        current: `$${discountedPrice}`,
        original: `$${price}`,
        discount: Math.round(((price - discountedPrice) / price) * 100)
      }
    }
    return {
      current: `$${price}`,
      original: null,
      discount: 0
    }
  }

  const priceInfo = formatPrice(course?.price, course?.discountedPrice)

  const getYouTubeEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtube.com") && parsedUrl.searchParams.get("v"))
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;

      if (parsedUrl.hostname === "youtu.be") return `https://www.youtube.com/embed${parsedUrl.pathname}`;

      return null;
    } catch {
      return null;
    }
  };

  const addToCart = async() => {
    if(!loggedIn)
    {
      navigate('/login')
      scrollTo(0,0)
    }
    addCartItem(course._id)
    getCartDetails()
  }
  
  const removeFromCart = async() => {
     if(!loggedIn)
    {
      navigate('/login')
      scrollTo(0,0)
    }
    removeCartItem(course._id)
    getCartDetails()
  }
  
  const buyProducts = async () => {
    if(!loggedIn)
    {
      navigate('/login')
      scrollTo(0,0)
    }else{
     navigate('/cart')
    buyNow(course._id)
    }
  }

  const addWishList = async() => {
    try { if(!loggedIn)
    {
      navigate('/login')
      scrollTo(0,0)
    }
      const {data} = await axios.post(`/api/wishlist/addwishlist/${course._id}`)
      if(!data.success){
        return toast.error(data.message)
      }else{
        toast.success(data.message)
        getWishListData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeWishList = async() => {
    try {
      const {data} = await axios.delete(`/api/wishlist/removewishlist/${course._id}`)
      if(!data.success){
        return toast.error(data.message)
      }else{
        toast.success(data.message)
        getWishListData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getWishListData = async () => {
    try {
      const { data } = await axios.get('/api/wishlist/getallwishList')
      if (!data.success) {
        console.log(data.message);
        return;
      }
      setWishlist(data.wishlists || []); 
    } catch (error) {
      console.log(error.message);
      setWishlist([]);
    }
  }

  const isInWishList = Array.isArray(wishList) && wishList.some(item => item._id.toLowerCase() === course._id.toLowerCase())
  console.log(isInWishList);
  
  useEffect(() => {
    const fetchWishListData = async () => {
      await getWishListData();
    };
    
    fetchWishListData();
  }, []);
  
  return (
    <motion.div
      className="w-full max-w-sm mx-auto"
    >
      {/* Sticky container */}
      <div className="sticky top-8 space-y-6">
        {/* Preview Video Card */}
        <div
          className={`rounded-xl border overflow-hidden shadow-lg ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 shadow-gray-900/20'
              : 'bg-white border-gray-200 shadow-gray-100/20'
          }`}
        >
          {/* Video Preview */}
          <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-purple-600">
            {
              getYouTubeEmbedUrl(course.trailer) && 
            
            <iframe 
              src={getYouTubeEmbedUrl(course.trailer)} 
              frameBorder="0" 
              className='w-full h-full'
              title="Course Preview"
              allowFullScreen
            ></iframe>

            }
            <div className="absolute top-4 left-4">
              <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                Preview
              </span>
            </div >
            <div
              onClick={()=>toast.error("Fullscreen is disabled in preview")}
             className='absolute bottom-3 right-4 p-4 cursor-not-allowed' >
              
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>
                {priceInfo.current}
              </span>
              {priceInfo.original && (
                <>
                  <span className={`text-lg line-through ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {priceInfo.original}
                  </span>
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
                    -{priceInfo.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Call to Action Text */}
            <p className={`text-center mb-6 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Message from {course.seller.name}:
              <span className="block mt-2 italic font-serif text-lg">
                "Hello everyone! I hope you're doing well.  
                This course is designed for {course.skillLevel} learners.  
                In just {course.totalHours} hours and {course.totalNumberOfLessons} lessons,  
                you'll gain all the skills you need to succeed.  
                Join now and start learning!"
              </span>
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              
              <motion.button
                 onClick={buyProducts}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Zap className="w-5 h-5" />
                Buy Now
              </motion.button>

              {
                isInCart ? (
                  
                    <motion.button
                    disabled = {loading}
                onClick={removeFromCart}
                className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg border-2 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-red-500 text-red-400 hover:bg-red-500/10'
                    : 'border-red-500 text-red-600 hover:bg-red-50'
                }`
              }
              >
                <ShoppingCart className="w-5 h-5" />
                Remove from Cart
                    </motion.button>
                ) : (
                  
                <motion.button
                disabled = {loading}
                onClick={addToCart}
                className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg border-2 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10'
                    : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                }`
              }
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
                </motion.button>     
                )
              }

              <div className="flex gap-2">
                {/* Wishlist Toggle Button */}
             <motion.button
                onClick={isInWishList ? removeWishList : addWishList}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                 isInWishList
                ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20'
               : theme === 'dark'
                ? 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400'
               : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                    }`}
                 >
                    <Heart className={`w-5 h-5 ${isInWishList ? 'fill-current' : ''}`} />
                 <span className="text-sm font-medium">
                  {isInWishList ? 'Saved' : 'Save'}
                  </span>
               </motion.button>

                <motion.button
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400'
                      : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Visit Seller</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CourseActions