import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const WhatYouWillLearn = ({ course, theme }) => {
  // Parse the whatYouWillLearn text into bullet points
  const learningPoints = course?.whatYouWillLearn 
    ? course.whatYouWillLearn
        .split('\r\n\r\n')
        .filter(point => point.trim() !== '')
        .map(point => point.replace(/\r\n/g, ' ').trim())
    : []

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

  if (!learningPoints.length) return null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full p-6 rounded-xl border transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/20'
          : 'bg-white border-gray-200 shadow-lg shadow-gray-100/20'
      }`}
    >
      <motion.h2 
        variants={itemVariants}
        className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        <div className={`p-2 rounded-lg ${
          theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
        }`}>
          <CheckCircle2 className={`w-6 h-6 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
        </div>
        What You Will Learn
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningPoints.map((point, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-gray-700/50 hover:bg-gray-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              theme === 'dark' ? 'text-green-400' : 'text-green-500'
            }`} />
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {point}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Progress indicator */}
      <motion.div
        variants={itemVariants}
        className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between text-sm">
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Learning Objectives
          </span>
          <span className={`font-medium ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {learningPoints.length} key areas
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WhatYouWillLearn