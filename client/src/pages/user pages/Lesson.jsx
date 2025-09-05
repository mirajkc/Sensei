import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import useAppContext from '../../context/AppContext'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import LessonDetails from '../../components/lessons components/LessonDetails'

const Lesson = () => {
  const { theme, userDetails } = useAppContext()
  const [courseDetails, setCourseDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const { courseId, lessonId } = useParams()
  const [sidebar, setSideBar] = useState(true)
  const navigate = useNavigate()

  //* Fetch course details
  const getCourseDetails = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/user/getsingleenrollmentcourse/${courseId}`)
      if (!data) {
        toast.error(data.message)
      } else {
        setCourseDetails(data.enrolledCourse)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  //

  //* Refetch course details when lessonId changes
  useEffect(() => { 
    getCourseDetails()
  }, [lessonId]) 

  const toggleSidebar = () => setSideBar(!sidebar)

  const navigateHandler = (lessonId) => {
    navigate(`/learn/${courseId}/${lessonId}`)
    window.scrollTo(0, 0) 
  }

  return (
    <div className={`flex h-screen ${theme === "dark" ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Sidebar */}
      <motion.div
        className={`border-r transition-all duration-300 ease-in-out flex flex-col ${theme === "dark" ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
        initial={false}
        animate={{ width: sidebar ? '300px' : '60px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Sidebar Header */}
        <div className={`p-4 flex items-center justify-between border-b ${theme === "dark" ? 'border-gray-700' : 'border-gray-200'}`}>
          {sidebar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full overflow-hidden">
                <img className="rounded-full w-full h-full" src={userDetails?.picture} alt="profile" />
              </div>
              <div>
                <p className="text-sm font-medium">Welcome Back</p>
                <p className="text-xs font-semibold">{userDetails?.name}</p>
              </div>
            </motion.div>
          )}

          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg transition-colors ${!sidebar ? 'mx-auto' : ''} ${theme === "dark" ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${sidebar ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          {sidebar ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-4"
            >

              {/* Lessons List */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Course Content</h3>
                <div className="space-y-2">
                  {courseDetails?.course?.lessons?.map((lesson, index) => {
                    const isActive = lesson._id.toString() === lessonId

                    return (
                      <motion.div
                        key={lesson._id}
                        onClick={() => navigateHandler(lesson._id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          p-3 rounded-lg cursor-pointer border flex items-center space-x-3 transition-colors
                          ${theme === "dark"
                            ? isActive
                              ? "bg-blue-900/30 border-blue-500"
                              : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                            : isActive
                              ? "bg-blue-50 border-blue-500"
                              : "bg-white border-gray-200 hover:bg-gray-100"}`}
                        aria-current={isActive ? "true" : "false"}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-600"}`}>
                          <span className="text-xs font-medium">{index + 1}</span>
                        </div>

                        <div className="flex-1">
                          <p className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>
                            {lesson.title || `Lesson ${index + 1}`}
                          </p>
                          <p className={`text-xs ${theme === "dark" ? 'text-gray-400' : 'text-gray-500'}`}>
                            {(lesson.lessonDuration ?? 5) * 60} minutes
                          </p>
                        </div>

                        {courseDetails?.completedLessons?.includes(lesson._id) && (
                          <span className="text-green-500 text-xs font-semibold">✔</span>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
              <div>
                {courseDetails?.completed }
              </div>
              <div className="flex justify-center mb-6">
                <h3
                  onClick={() => { navigate('/enrolledcourses'); navigate(0, 0) }}
                  className="flex text-sm text-blue-500 cursor-pointer underline font-medium mb-3"
                >
                  Go to My Courses
                </h3>
              </div>
            </motion.div>
          ) : (
            <div className="p-2 space-y-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto ${theme === "dark" ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <svg className={`w-4 h-4 ${theme === "dark" ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-6">
            <LessonDetails courseDetails={courseDetails} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Lesson
