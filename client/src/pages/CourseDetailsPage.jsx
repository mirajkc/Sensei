import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { motion } from 'framer-motion'
import useAppContext from '../context/AppContext.jsx'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import CourseInfo from '../components/course detail component/CourseInfo.jsx'
import WhatYouWillLearn from '../components/course detail component/WhatYouWillLearn.jsx'
import CourseIncludes from '../components/course detail component/CourseIncludes.jsx'
import CourseContent from '../components/course detail component/CourseContent.jsx'
import CourseActions from '../components/course detail component/CourseActions.jsx'
import CourseRequirements from '../components/course detail component/CourseRequirements.jsx'
import RelatedCourses from '../components/course detail component/RelatedCourses.jsx'
import InstructorDetails from '../components/course detail component/InstructorDetails.jsx'

const CourseDetailsPage = () => {
  const { theme } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState(null)
  const [slicer, setSlicer] = useState(500)
  const [whatYouWillLearnSlicer, setWhatYouWillLearnSlicer] = useState(500)

  const navigate = useNavigate()
  const params = useParams()
  const { courseId } = params

  //* API call to get course details
  const getCourseData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/course/getsinglecourseforui/${courseId}`)
      if (!data.success) {
        return toast.error(data.message)
      }
      setCourse(data.course)
    } catch (error) {
      toast.error(error.message || 'Failed to fetch course data')
    } finally {
      setLoading(false)
    }
  }

  // Fixed useEffect - no longer returns a Promise
  useEffect(() => {
    const fetchData = async () => {
      await getCourseData()
    }
    fetchData()
  }, [courseId])

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="flex items-center gap-3">
          <Loader2 className={`w-8 h-8 animate-spin ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <span className={`text-lg font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Loading course details...
          </span>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Course not found
          </h2>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            The course you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/discovercourses')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  const handleSlicer = () => {
    setSlicer(slicer + 500)
  }

  // Fixed function name and logic
  const handleWhatYouWillLearnSlicer = () => {
    setWhatYouWillLearnSlicer(whatYouWillLearnSlicer + 500)
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen w-full px-4 md:px-8 lg:px-16 py-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 mb-8" aria-label="Breadcrumb">
        <button
          onClick={() => navigate('/home')}
          className={`text-sm font-medium transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5 cursor-pointer ${
            theme === 'dark'
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-800'
          }`}
          aria-label="Navigate to Home"
        >
          Home
        </button>

        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} aria-hidden="true">
          /
        </span>

        <button
          onClick={() => navigate('/discovercourses')}
          className={`text-sm font-medium transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5 cursor-pointer ${
            theme === 'dark'
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-800'
          }`}
          aria-label="Navigate to Discover Courses"
        >
          Discover Courses
        </button>

        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} aria-hidden="true">
          /
        </span>

        <span
          className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
          aria-current="page"
        >
          {course.title}
        </span>
      </nav>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Main Content */}
        <div className="flex-1 lg:w-7/10 space-y-6">
          {/* Course Info */}
          <CourseInfo course={course} theme={theme} />

          {/* What You Will Learn */}
          <WhatYouWillLearn course={course} theme={theme} />

          {/* Course Includes */}
          <CourseIncludes course={course} theme={theme} />

          {/* Course Content */}
          <CourseContent course={course} theme={theme} />
          
          {/* Requirements */}
          <CourseRequirements course={course} theme={theme} />

          {/* Full Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`w-full p-6 rounded-xl border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/20'
                : 'bg-white border-gray-200 shadow-lg shadow-gray-100/20'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Course Description
            </h2>
            <div className={`prose max-w-none ${
              theme === 'dark' ? 'prose-invert' : ''
            }`}>
              <p className={`text-lg leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {course.description.length <= 500
                  ? course.description
                  : course.description.slice(0, slicer)}
                {
                  slicer < course.description.length ? (
                    <button
                      onClick={handleSlicer}
                      className='mt-2 ml-1 text-sm font-medium transition-colors duration-200 text-blue-500'
                    >...Show More</button>
                  ) : null
                }
              </p>
              {course.whatYouWillLearn && (
                <div className="mt-6">
                  <h3 className={`text-lg font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Detailed Learning Outcomes
                  </h3>
                  <div className={`whitespace-pre-wrap ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {course.whatYouWillLearn.length <= 500
                      ? course.whatYouWillLearn
                      : course.whatYouWillLearn.slice(0, whatYouWillLearnSlicer)}
                    {
                      whatYouWillLearnSlicer < course.whatYouWillLearn.length ? (
                        <button
                          onClick={handleWhatYouWillLearnSlicer}
                          className='mt-2 ml-1 text-sm font-medium transition-colors duration-200 text-blue-500'
                        >...Show More</button>
                      ) : null
                    }
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Related Courses */}
          <motion.div
            initial={{ opacity: 0, x : -30 }}
            whileInView={{ opacity: 1, x : 0 }}
            transition={{ duration: 0.8 }}
            className={`w-full p-6 rounded-xl border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/20'
                : 'bg-white border-gray-200 shadow-lg shadow-gray-100/20'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Students also bought
            </h2>
            <div className={`text-center py-12 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <RelatedCourses />
            </div>
          </motion.div>

          {/* Instructor Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`w-full p-6 rounded-xl border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/20'
                : 'bg-white border-gray-200 shadow-lg shadow-gray-100/20'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Instructor
            </h2>
            <div className={`text-center py-12 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <InstructorDetails course={course} theme={theme} />
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`w-full p-6 rounded-xl border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/20'
                : 'bg-white border-gray-200 shadow-lg shadow-gray-100/20'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Student Reviews
            </h2>
            <div className={`text-center py-12 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <p>Reviews and comments component coming soon...</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Actions & Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-3/10 h-max sticky top-0 flex flex-col p-6 space-y-6"
        >
          <CourseActions course={course} theme={theme} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CourseDetailsPage