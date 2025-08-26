import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Monitor, Code, Database, Wifi } from 'lucide-react'

const CourseRequirements = ({ course, theme }) => {
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

  // Default requirements for MongoDB course (you can modify this based on course type)
  const requirements = [
    {
      icon: Monitor,
      title: 'Computer Requirements',
      items: [
        'Windows, macOS, or Linux operating system',
        'At least 4GB RAM (8GB recommended)',
        'Minimum 2GB free disk space',
        'Modern web browser (Chrome, Firefox, Safari, or Edge)'
      ],
      type: 'required'
    },
    {
      icon: Code,
      title: 'Software Requirements',
      items: [
        'MongoDB Community Edition (free)',
        'MongoDB Compass (GUI tool - optional but recommended)',
        'Text editor or IDE (VS Code, Sublime Text, etc.)',
        'Node.js (if following along with backend examples)'
      ],
      type: 'required'
    },
    {
      icon: Database,
      title: 'Prior Knowledge',
      items: [
        'Basic understanding of databases (helpful but not required)',
        'Familiarity with command line interface (basic level)',
        'No prior MongoDB experience needed - we start from scratch',
        'Enthusiasm to learn database management!'
      ],
      type: 'recommended'
    },
    {
      icon: Wifi,
      title: 'Internet & Tools',
      items: [
        'Stable internet connection for video streaming',
        'MongoDB Atlas account (free cloud database - optional)',
        'GitHub account for accessing course resources',
        'Note-taking application or physical notebook'
      ],
      type: 'recommended'
    }
  ]

  const getRequirementColor = (type) => {
    if (type === 'required') {
      return {
        icon: theme === 'dark' ? 'text-red-400' : 'text-red-500',
        bg: theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50',
        border: theme === 'dark' ? 'border-red-700' : 'border-red-200'
      }
    }
    return {
      icon: theme === 'dark' ? 'text-blue-400' : 'text-blue-500',
      bg: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50',
      border: theme === 'dark' ? 'border-blue-700' : 'border-blue-200'
    }
  }

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
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${
          theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-100'
        }`}>
          <AlertCircle className={`w-6 h-6 ${
            theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
          }`} />
        </div>
        <h2 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Requirements
        </h2>
      </motion.div>

      <motion.p 
        variants={itemVariants}
        className={`mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        Here's what you'll need to get the most out of this course:
      </motion.p>

      <div className="grid gap-6 md:grid-cols-2">
        {requirements.map((requirement, index) => {
          const colors = getRequirementColor(requirement.type)
          const RequirementIcon = requirement.icon

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-5 rounded-lg border ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <RequirementIcon className={`w-6 h-6 ${colors.icon}`} />
                <div>
                  <h3 className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {requirement.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    requirement.type === 'required'
                      ? theme === 'dark'
                        ? 'bg-red-800/50 text-red-300'
                        : 'bg-red-100 text-red-700'
                      : theme === 'dark'
                      ? 'bg-blue-800/50 text-blue-300'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {requirement.type === 'required' ? 'Required' : 'Recommended'}
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                {requirement.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      {/* Help section */}
      <motion.div
        variants={itemVariants}
        className={`mt-6 p-4 rounded-lg border ${
          theme === 'dark'
            ? 'bg-blue-900/20 border-blue-700'
            : 'bg-blue-50 border-blue-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <AlertCircle className={`w-5 h-5 mt-0.5 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <div>
            <h4 className={`font-medium mb-1 ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
            }`}>
              Need Help Getting Started?
            </h4>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
            }`}>
              Don't worry if you don't have everything set up yet! The first few lessons will guide you through installing and configuring all the necessary tools step by step.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick start note */}
      <motion.div
        variants={itemVariants}
        className="mt-4 text-center"
      >
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          ⚡ Most students are ready to start within 15-30 minutes of setup
        </p>
      </motion.div>
    </motion.div>
  )
}

export default CourseRequirements