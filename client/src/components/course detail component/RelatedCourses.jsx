import React, { useEffect, useState } from 'react'
import useAppContext from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import axios from 'axios'
import { UsersRound, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const RelatedCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const { theme } = useAppContext()
  const navigate = useNavigate()

  const getAllCourses = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/course/getAllCourseForUI')
      if (!data.success) {
        toast.error(data.message)
      } else {
        setCourses(data.courses)
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch related courses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchCourses = async () => {
      await getAllCourses()
    }
    fetchCourses()
  }, [])

  // Format date function
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return `Updated ${date.getMonth() + 1}/${date.getFullYear()}`
    } catch {
      return 'Updated 6/2025'
    }
  }

  // Hardcoded enrolled students for now
  const getEnrolledStudents = (index) => {
    const baseNumbers = [945254, 53425, 7031, 22533, 97526, 164970]
    return baseNumbers[index % baseNumbers.length]
  }

  // Hardcoded ratings
  const getRating = (index) => {
    const ratings = [4.6, 4.6, 4.7, 4.6, 4.8, 4.7]
    return ratings[index % ratings.length]
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
          theme === 'dark' ? 'border-blue-400' : 'border-blue-500'
        }`}></div>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {courses.slice(0, 6).map((course, index) => (
        <motion.div
          key={course._id || index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={(e)=>{
            e.stopPropagation()
            navigate(`/coursedetail/${course._id}`)
            scrollTo(0,0)
          }}
          className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 border-b ${
            theme === 'dark' 
              ? 'hover:bg-gray-800 border-gray-700' 
              : 'hover:bg-gray-50 border-gray-200'
          }`}
        >
          {/* Course Thumbnail */}
          <div className="flex-shrink-0">
            <img 
              src={course.thumbnail || '/placeholder-course.jpg'} 
              alt={course.title}
              className="w-16 h-12 rounded object-cover"
            />
          </div>

          {/* Course Title - Left Side */}
          <div className="flex-1 min-w-0 mr-4">
            <h3 className={`font-medium text-base mb-1 line-clamp-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {course.title}
            </h3>
            
            <div className="flex justify-center items-center gap-2">
              <div className={`flex items-center gap-3 text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span>{course.totalHours} total hours</span>
                <span>•</span>
                <span>{formatDate(course.createdAt || course.UpdatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className={`font-semibold text-sm ${
              theme === 'dark' ? 'text-yellow-400' : 'text-orange-600'
            }`}>
              {getRating(index)}
            </span>
            <Star 
              size={14} 
              className={`fill-current ${
                theme === 'dark' ? 'text-yellow-400' : 'text-orange-500'
              }`} 
            />
          </div>

          {/* Enrolled Students */}
          <div className={`flex items-center gap-1 flex-shrink-0 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <UsersRound size={14} />
            <span className="text-sm font-medium">
              {getEnrolledStudents(index).toLocaleString()}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-end flex-shrink-0 min-w-[80px]">
            <span className={`text-lg font-bold ${
              theme === 'dark' ? 'text-green-400' : 'text-gray-900'
            }`}>
              ${course.discountedPrice || course.price || ['$69.99', '$59.99', '$19.99', '$44.99', '$44.99', '$59.99'][index]}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default RelatedCourses