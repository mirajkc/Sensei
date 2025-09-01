import React, { useEffect, useState } from 'react'
import useAppContext from '../../context/AppContext.jsx'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const [details, setDetails] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [coupnBox, setCoupnBox] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [totalAmount , setTotalAmount] = useState("")
  const { theme } = useAppContext()
  const navigate = useNavigate()

  //* make the api call to fetch the user cart state
  const getCartDetails = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/cart/getCartDetails')
      if (!data.success) {
        return toast.error(data.message)
      } else {
        setCourses(data.cartItems)
        setDetails(data)
        setTotalAmount(data.discountedAmount)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  //* make the api call to remove the product from cart
  const removeProductFromCart = async (courseId) => {
    try {
      setLoading(true)
      const { data } = await axios.delete(`/api/cart/removefromcart/${courseId}`)
      if (!data.success) {
        return toast.error(data.message)
      } else {
        toast.success(data.message)
        getCartDetails()
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleCoupon = () => {
    setCoupnBox(!coupnBox)
  }

  const applyCoupon = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/purchase/verifycoupon', { coupon });
      if(!data.success){
        return toast.error(data.message)
      }else{
        setTotalAmount(data.totalCartAmount)
        toast.success(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  
  

  useEffect(() => { getCartDetails() }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: { duration: 0.3 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`w-8 h-8 border-4 border-t-transparent rounded-full ${theme === 'dark' ? 'border-indigo-400' : 'border-indigo-500'}`}
        />
      </div>
    )
  }
  //* purchase course 
  const purchase = async() => {
    try {
      const courseId = courses.map(course => course._id)
      const totalCartAmount = totalAmount
      const {data} = await axios.post('/api/purchase/cartPurchase' , {courseId , totalCartAmount} )
      if(!data.success){
        return toast.error(data.message)
      }else{
        toast.success(data.message)
        getCartDetails()
        navigate('/mycourses')
        scrollTo(0,0)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      <div className="flex flex-col lg:flex-row py-16 max-w-7xl w-full px-6 mx-auto gap-8">
        
        {/* Cart Items Section */}
        <motion.div variants={itemVariants} className='flex-1 max-w-4xl'>
          <motion.h1 
            variants={itemVariants}
            className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Shopping Cart 
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-lg text-indigo-500 ml-3 font-medium"
            >
              {details?.totalCartItems || 0} Items
            </motion.span>
          </motion.h1>

          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className={`grid grid-cols-[2fr_1fr_1fr] text-base font-semibold pb-4 border-b-2 mb-6 ${theme === 'dark' ? 'text-gray-300 border-gray-700' : 'text-gray-600 border-gray-200'}`}
          >
            <p className="text-left">Course Details</p>
            <p className="text-center">Price</p>
            <p className="text-center">Remove</p>
          </motion.div>

          {/* Cart Items */}
          <AnimatePresence mode="popLayout">
            {courses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center py-16 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
              >
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
                <p>Add some courses to get started!</p>
              </motion.div>
            ) : (
              courses.map((product, index) => (
                <motion.div
                  key={product?._id || index}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.01 }}
                  className={`grid grid-cols-[2fr_1fr_1fr] items-center p-4 mb-4 rounded-xl border transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600' 
                      : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="cursor-pointer w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border-2 border-gray-300 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50"
                    >
                      <img 
                        className="max-w-full h-full object-cover" 
                        src={product?.thumbnail || '/api/placeholder/96/96'} 
                        onClick={()=>{navigate(`/coursedetail/${product._id}`);scrollTo(0,0)}}
                        alt={product?.title.slice(0,200)}
                        onError={(e) => {
                          e.target.src = '/api/placeholder/96/96'
                        }}
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-lg mb-1 truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {product?.title.slice(0,30) || 'Course Title'}...
                      </h3>
                    </div>
                  </div>

                  <div className="text-center">
                    <motion.p 
                      className={`text-xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      ${product?.discountedPrice || 120}
                    </motion.p>
                  </div>

                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-full transition-all duration-200 ${
                        theme === 'dark'
                          ? 'hover:bg-red-900/20 text-red-400 hover:text-red-300'
                          : 'hover:bg-red-50 text-red-500 hover:text-red-600'
                      }`}
                      onClick={() => removeProductFromCart(product?._id)}
                    >
                      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>

          {/* Continue Shopping Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`group cursor-pointer flex items-center mt-8 gap-3 font-semibold text-lg transition-colors duration-200 ${
              theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
            }`}
            onClick={() => {
              navigate('/home');
              scrollTo(0, 0)
            }}
          >
            <motion.svg
              width="18"
              height="14"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:-translate-x-1 transition-transform duration-200"
            >
              <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            Continue Shopping
          </motion.button>
        </motion.div>

        {/* Order Summary Section */}
        <motion.div
          variants={cardVariants}
          className={`max-w-[400px] w-full p-8 rounded-2xl border-2 h-fit sticky top-8 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700 shadow-2xl' 
              : 'bg-white border-gray-200 shadow-xl'
          }`}
        >
          <motion.h2 
            variants={itemVariants}
            className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Order Summary
          </motion.h2>

          <motion.hr 
            variants={itemVariants}
            className={`my-6 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`} 
          />

          <motion.div variants={itemVariants} className="space-y-4 mb-6">
            <div className={`flex justify-between text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Net Amount</span>
              <span className="font-semibold">${details?.totalCartAmount || 0}</span>
            </div>
            <div className={`flex justify-between text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Discounted Amount</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                ${details?.discountedAmount || 0}
              </span>
            </div>
            <motion.hr className={`${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`} />
            <div className={`flex justify-between text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <span>Total Amount:</span>
              <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                ${totalAmount || 0}
              </span>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700/50' : 'bg-yellow-50 border border-yellow-200'}`}
          >
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800'}`}>
              <strong>Note:</strong> Checkout is temporarily disabled. Use coupon code <span className="font-mono font-bold">"FREE"</span> to get courses for free!
            </p>
          </motion.div>


          {
            totalAmount === 0 ? (
            <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={purchase}
            className={`w-full py-4 mb-4 font-semibold rounded-xl  transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-green-700 text-white-500 border border-green-600'
                : 'bg-green-500 text-white border border-green-300'
            }`}
          >
            Purchase Courses
          </motion.button>
            ): (
              <motion.button
            variants={itemVariants}
            disabled
            className={`w-full py-4 mb-4 font-semibold rounded-xl cursor-not-allowed transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-500 border border-gray-600'
                : 'bg-gray-200 text-gray-400 border border-gray-300'
            }`}
          >
            Go to CheckOut (Disabled)
          </motion.button>
            )
          }

          

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleCoupon}
            className={`w-full py-4 font-semibold rounded-xl transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            {coupnBox ? 'Hide Coupon' : 'Apply Coupon'}
          </motion.button>

          <AnimatePresence>
            {coupnBox && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-3"
              >
                <motion.input
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  type="text"
                  placeholder="Enter coupon code (e.g., FREE)"
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500'
                  }`}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={applyCoupon}
                  className={`w-full py-3 font-semibold rounded-xl transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  Apply Coupon
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Cart