import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock, BookOpen, FileText, Lightbulb } from 'lucide-react'
import useAppContext from '../../context/AppContext'

const LessonDetails = ({ courseDetails }) => {
  const { theme } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  //* get the single lesson data dynamically 
  const { lessonId, courseId } = useParams()
  const lessonDetails = courseDetails?.course?.lessons?.find(item => item._id.toString() === lessonId.toString()) ?? "Null no data"
  console.log(courseDetails?.currentlyIn ?? "Not getting currently in data")

  //* track the progress upon completing next lesson
  const trackUserProgress = async () => {
    try {
      const { data } = await axios.get(`/api/user/trackuserprogress/${courseId}/${lessonId}`)
      if (!data?.success) {
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { trackUserProgress() }, [courseDetails, lessonId, courseId])

  const getYouTubeEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url)

      if (parsedUrl.hostname.includes("youtube.com") && parsedUrl.searchParams.get("v"))
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`

      if (parsedUrl.hostname === "youtu.be") return `https://www.youtube.com/embed${parsedUrl.pathname}`

      return null
    } catch {
      return null
    }
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      }`}
    >
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Video Section */}
        <motion.div
          variants={videoVariants}
          className="mb-8 lg:mb-12"
        >
          <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${
            theme === 'dark' 
              ? 'bg-gray-800 ring-1 ring-gray-700' 
              : 'bg-white ring-1 ring-gray-200'
          }`}>
            <div className="aspect-video relative">
              {!videoLoaded && (
                <div className={`absolute inset-0 flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className={`w-12 h-12 border-4 border-t-transparent rounded-full ${
                      theme === 'dark' ? 'border-blue-400' : 'border-blue-500'
                    }`}
                  />
                </div>
              )}
              <iframe
                src={getYouTubeEmbedUrl(lessonDetails?.videoGuide)}
                allowFullScreen
                frameBorder="0"
                className="absolute inset-0 w-full h-full rounded-xl"
                onLoad={() => setVideoLoaded(true)}
                title={lessonDetails?.title}
              />
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Section */}
            <motion.div
              variants={itemVariants}
              className={`p-6 lg:p-8 rounded-2xl shadow-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  theme === 'dark' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  <Play className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {lessonDetails?.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`flex items-center gap-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Clock className="w-4 h-4" />
                      {Math.floor(lessonDetails?.lessonDuration * 60)} minutes
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description Section */}
            <motion.div
              variants={itemVariants}
              className={`p-6 lg:p-8 rounded-2xl shadow-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-green-100 text-green-600'
                }`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <h2 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Lesson Overview
                </h2>
              </div>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {lessonDetails?.description}
              </p>
            </motion.div>

            {/* What You'll Learn Section */}
            <motion.div
              variants={itemVariants}
              className={`p-6 lg:p-8 rounded-2xl shadow-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-yellow-500/20 text-yellow-400' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h2 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  What You'll Learn
                </h2>
              </div>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {lessonDetails?.whatYouWillLearn}
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info Card */}
            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Lesson Information
              </h3>
              <div className="space-y-3">
                <div className={`flex items-center justify-between py-2 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Duration
                  </span>
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {Math.floor(lessonDetails?.lessonDuration * 60)} min
                  </span>
                </div>
                <div className={`flex items-center justify-between py-2 ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Format
                  </span>
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Video + Text
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Text Guide Section */}
            {lessonDetails?.textguide && (
              <motion.div
                variants={itemVariants}
                className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Text Guide
                  </h3>
                </div>
                <div className={`max-h-96 overflow-y-auto rounded-lg p-4 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 text-gray-300' 
                    : 'bg-gray-50 text-gray-700'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {lessonDetails.textguide}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LessonDetails