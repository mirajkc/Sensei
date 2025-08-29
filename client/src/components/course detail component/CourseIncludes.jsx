import React from 'react'
import { motion } from 'framer-motion'
import { Clock, PlayCircle, FileText, Award, Globe, Users } from 'lucide-react'

const CourseIncludes = ({ course, theme }) => {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  }

  const includesData = [
    {
      icon: Clock,
      label: 'Total Hours',
      value: `${course?.totalHours || 0} hours`,
      color: 'blue'
    },
    {
      icon: PlayCircle,
      label: 'Video Lessons',
      value: `${course?.totalNumberOfLessons || 0} hours on-demand video`,
      color: 'green'
    },
    {
      icon: FileText,
      label: 'Articles',
      value: `${course?.totalNumberOfLessons || 0} Articles`,
      color: 'purple'
    },
    {
      icon: Award,
      label: 'Certificate',
      value: 'Upon completion',
      color: 'yellow'
    },
    {
      icon: Globe,
      label: 'Language',
      value: 'English',
      color: 'indigo'
    },
    {
      icon: Users,
      label: 'Skill Level',
      value: course?.skillLevel || 'Beginner',
      color: 'pink'
    }
  ]

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
      green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
      purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
      yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400' },
      indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
      pink: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400' }
    }
    return colorMap[color] || colorMap.blue
  }

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
      <motion.h2 
        variants={itemVariants}
        className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        This Course Includes
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {includesData.map((item, index) => {
          const colorClasses = getColorClasses(item.color)
          const Icon = item.icon

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                  : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
                <Icon className={`w-6 h-6 ${colorClasses.text}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {item.label}
                </p>
                <p className={`text-lg font-bold truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.value}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Additional course stats */}
      <motion.div
        variants={itemVariants}
        className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4">
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Created: {new Date(course?.createdAt).toLocaleDateString()}
            </span>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Last Updated: {new Date(course?.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            theme === 'dark'
              ? 'bg-green-900/30 text-green-400'
              : 'bg-green-100 text-green-700'
          }`}>
            ✓ Lifetime Access
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CourseIncludes