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

  //* req based on category
const courseCategory = course?.category;

const categoryRequirements = {
  "Web Development": "Basic understanding of HTML, CSS, and JavaScript is recommended.",
  "Digital Marketing": "Familiarity with social media platforms and marketing concepts is helpful.",
  "Data Science": "Some experience with Python or statistics will be beneficial.",
  "Front End Development": "Knowledge of HTML, CSS, and a JavaScript framework like React is recommended.",
  "Back End Development": "Understanding of server-side programming and databases is recommended.",
  "Others": "No specific requirements. Just a willingness to learn!"
};

//* Dynamic requirement variable
const requirementText = categoryRequirements[courseCategory] || "No specific requirements.";

const courseLevel = course?.skillLevel;

const levelRequirements = {
  "Beginner": "No prior experience is needed. This course is perfect for newcomers.",
  "Intermediate": "Basic understanding of the subject is recommended before starting this course.",
  "Advanced": "Strong knowledge and experience in the subject is required to follow this course effectively."
};

//* Dynamic requirement based on level
const levelRequirementText = levelRequirements[courseLevel] || "No specific requirements.";


  

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
            <div className="space-y-2 mb-6">
        <div className={`p-3 rounded-lg transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-600 hover:text-white' 
            : 'bg-gray-50 text-gray-800 hover:bg-gray-200 hover:text-gray-900'
        }`}>
          <p className="text-sm">✓ {requirementText}</p>
        </div>
        <div className={`p-3 rounded-lg transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-600 hover:text-white' 
            : 'bg-gray-50 text-gray-800 hover:bg-gray-200 hover:text-gray-900'
        }`}>
          <p className="text-sm">✓ {levelRequirementText}</p>
        </div>
        <div className={`p-3 rounded-lg transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-600 hover:text-white' 
            : 'bg-gray-50 text-gray-800 hover:bg-gray-200 hover:text-gray-900'
        }`}>
          <p className="text-sm">✓ Have a computer with stable internet connection</p>
        </div>
        <div className={`p-3 rounded-lg transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-600 hover:text-white' 
            : 'bg-gray-50 text-gray-800 hover:bg-gray-200 hover:text-gray-900'
        }`}>
          <p className="text-sm">✓ Prepare to build real projects!</p>
        </div>
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