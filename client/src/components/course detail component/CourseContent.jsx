import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, PlayCircle, Clock, FileText, Video } from 'lucide-react'

const CourseContent = ({ course, theme }) => {
  const [expandedLessons, setExpandedLessons] = useState(new Set([course?.lessons[0]?._id]))

  const toggleLesson = (lessonId) => {
    const newExpanded = new Set(expandedLessons)
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId)
    } else {
      newExpanded.add(lessonId)
    }
    setExpandedLessons(newExpanded)
  }

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

  const formatDuration = (duration) => {
    const totalMinutes = Math.round(duration * 60)
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const lessons = course?.lessons || []

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      className={`w-full p-6 rounded-xl border transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/20'
          : 'bg-white border-gray-200 shadow-lg shadow-gray-100/20'
      }`}
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Course Content 
        </h2>
        <div className={`px-4 py-2 rounded-lg ${
          theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
        }`}>
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {lessons.length} Lessons
          </span>
        </div>
      </motion.div>

      {/* Course overview stats */}
      <motion.div 
        variants={itemVariants}
        className={`flex flex-wrap items-center gap-6 p-4 mb-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {course?.totalHours} Total Hours
          </span>
        </div>
        <div className="flex items-center gap-2">
          <PlayCircle className={`w-5 h-5 ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`} />
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {lessons.length} Lessons
          </span>
        </div>
      </motion.div>

      {/* Lessons list */}
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <motion.div
            key={lesson._id}
            variants={itemVariants}
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              theme === 'dark'
                ? 'border-gray-700 bg-gray-700/30'
                : 'border-gray-200 bg-white'
            }`}
          >
            {/* Lesson header */}
            <motion.div
              onClick={() => toggleLesson(lesson._id)}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-300 hover:${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}
              whileHover={{ x: 4 }}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
                theme === 'dark'
                  ? 'bg-blue-900/50 text-blue-400'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {lesson.lessonNumber}
              </div>

              <motion.div
                animate={{ rotate: expandedLessons.has(lesson._id) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {lesson.title}
                </h3>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock className={`w-4 h-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {formatDuration(lesson.lessonDuration)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Expanded lesson content */}
            <AnimatePresence>
              {expandedLessons.has(lesson._id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`border-t ${
                    theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                  }`}
                >
                  <div className="p-4 space-y-4">
                    {/* Lesson description */}
                    <div>
                      <h4 className={`font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Description
                      </h4>
                      <p className={`text-sm leading-relaxed ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {lesson.description}
                      </p>
                    </div>

                    {/* What you'll learn */}
                    {lesson.whatYouWillLearn && (
                      <div>
                        <h4 className={`font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          What You'll Learn
                        </h4>
                        <p className={`text-sm leading-relaxed ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {lesson.whatYouWillLearn}
                        </p>
                      </div>
                    )}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Course completion indicator */}
      <motion.div
        variants={itemVariants}
        className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <span className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Complete all lessons to earn your certificate
          </span>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            theme === 'dark'
              ? 'bg-yellow-900/30 text-yellow-400'
              : 'bg-yellow-100 text-yellow-700'
          }`}>
             Certificate Available
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CourseContent