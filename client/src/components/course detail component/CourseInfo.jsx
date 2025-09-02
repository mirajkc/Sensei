import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Users, MessageCircle, Calendar, Globe, Award } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CourseInfo = ({ course, theme }) => {
  const [seemore , setSeeMore] = useState(500)
  const [enrolledCourse , setEnrolledCourse] = useState(0)

  const getCount = async() =>{
    try {
      const {data} = await axios.get(`/api/user/getenrollmentcount/${course._id}`)
      if(!data.success){
        return toast.error(data.message)
      }else{
        setEnrolledCourse(data.totalEnrollment)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{getCount()} , [])
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
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
    }
  }

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
  const handleSlider = () => {
    setSeeMore(seemore + 500)
  }



  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Course Title */}
      <motion.h1 
        variants={itemVariants}
        className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        {course?.title}
      </motion.h1>

      {/* Course Description */}
      <motion.p 
        variants={itemVariants}
        className={`text-lg leading-relaxed mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        {course?.description.length > 500 ? (
         <>
          {course.description.slice(0, seemore)}
          {
            seemore < course.description.length && (
              <span
              className="text-blue-500 cursor-pointer ml-1"
              onClick={handleSlider}
              >
                ...see more
              </span>
            )
          }
          </>
        ) : (
        course.description
       )}
      
      </motion.p>

      {/* Course Stats */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap items-center gap-6 mb-6"
      >
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                className={`w-5 h-5 ${
                  star <= 4 
                    ? 'text-yellow-400 fill-current' 
                    : theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className={`font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            4.5
          </span>
        </div>

        {/* Students */}
        <div className="flex items-center gap-2">
          <Users className={`w-5 h-5 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {enrolledCourse} students
          </span>
        </div>

        {/* Comments */}
        <div className="flex items-center gap-2">
          <MessageCircle className={`w-5 h-5 ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`} />
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {course.comments.length} comments
          </span>
        </div>
      </motion.div>

      {/* Instructor Info */}
      <motion.div 
        variants={itemVariants}
        className={`flex items-center gap-4 p-4 rounded-lg mb-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}
      >
        <img
          src={course?.seller?.image}
          alt={course?.seller?.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/20"
        />
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {course?.seller?.name}
          </h3>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {course?.seller?.specialization}
          </p>
          <p className={`text-xs mt-1 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            {course?.seller?.experience}
          </p>
        </div>
      </motion.div>

      {/* Course Meta Information */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <Calendar className={`w-5 h-5 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <div>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Course Created At
            </p>
            <p className={`text-sm font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {new Date(course?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <Calendar className={`w-5 h-5 ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`} />
          <div>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Course Updated At
            </p>
            <p className={`text-sm font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {new Date(course?.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <Globe className={`w-5 h-5 ${
            theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
          }`} />
          <div>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Languages Used
            </p>
            <p className={`text-sm font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {course?.language}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <Award className={`w-5 h-5 ${
            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
          }`} />
          <div>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Course Difficulty
            </p>
            <p className={`text-sm font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {course?.skillLevel}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Category and Price */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          theme === 'dark'
            ? 'bg-blue-900/30 text-blue-400'
            : 'bg-blue-100 text-blue-600'
        }`}>
          {course?.category}
        </div>

        <div className="flex items-center gap-3">
          {priceInfo.original && (
            <>
              <span className={`text-lg line-through ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {priceInfo.original}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-bold text-white bg-red-500`}>
                -{priceInfo.discount}%
              </span>
            </>
          )}
          <span className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`}>
            {priceInfo.current}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CourseInfo