import React from 'react'
import useAppContext from '../../context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const CreatePost = () => {
  const { theme } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const navigate = useNavigate()

  const createNewPost = async(e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post('/api/post/createnewblog', { title, content, tags })
      if (!data.success) {
        return toast.error(data.message)
      }

      if (data.success) {
        toast.success(data.message)
        navigate('/community')
        return
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoBack = () => {
    navigate('/community')
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${
            theme === 'dark'
              ? 'from-blue-400 via-purple-400 to-pink-400'
              : 'from-blue-600 via-purple-600 to-pink-600'
          } bg-clip-text text-transparent`}>
            Create New Post
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Share your knowledge and connect with the community
          </p>
          
          {/* Back to Community Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300'
            }`}
          >
            <svg className="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Community
          </motion.button>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white/70 border-gray-200'
          } backdrop-blur-sm border rounded-2xl p-8 shadow-2xl`}
        >
          <form onSubmit={createNewPost} className="space-y-8">
            {/* Title Input */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className={`block text-lg font-semibold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <svg className="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title for your post..."
                className={`w-full px-4 py-4 rounded-xl text-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-purple-500'
                    : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500'
                } border-2 focus:outline-none focus:ring-4 focus:ring-opacity-20 ${
                  theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                }`}
                required
              />
            </motion.div>

            {/* Tags Selection */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className={`block text-lg font-semibold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <svg className="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Post Category
              </label>
              <select
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={`w-full px-4 py-4 rounded-xl text-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 text-white focus:bg-gray-700 focus:border-purple-500'
                    : 'bg-white/80 border-gray-300 text-gray-900 focus:bg-white focus:border-blue-500'
                } border-2 focus:outline-none focus:ring-4 focus:ring-opacity-20 ${
                  theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                }`}
                required
              >
                <option value="" disabled className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Please select a category
                </option>
                <option value="Question">❓ Question</option>
                <option value="Discussion">💬 Discussion</option>
                <option value="Project">🚀 Project</option>
                <option value="Announcement">📢 Announcement</option>
                <option value="Other">🔖 Other</option>
              </select>
            </motion.div>

            {/* Content Textarea */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label className={`block text-lg font-semibold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <svg className="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Post Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, knowledge, or ask your question here..."
                rows="10"
                className={`w-full px-4 py-4 rounded-xl text-lg transition-all duration-300 resize-none ${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-purple-500'
                    : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500'
                } border-2 focus:outline-none focus:ring-4 focus:ring-opacity-20 ${
                  theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                }`}
                required
              />
              <div className={`mt-2 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {content.length}/2000 characters
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  loading
                    ? theme === 'dark'
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25'
                } transform ${loading ? '' : 'hover:-translate-y-1'}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Post...
                  </>
                ) : (
                  <>
                    <svg className="inline w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Publish Post
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleGoBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-2 border-gray-600'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300'
                } transform hover:-translate-y-1`}
              >
                Cancel
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className={`mt-8 ${
            theme === 'dark'
              ? 'bg-gray-800/30 border-gray-700'
              : 'bg-white/50 border-gray-200'
          } backdrop-blur-sm border rounded-xl p-6`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            💡 Tips for a Great Post
          </h3>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <div className="flex items-start space-x-2">
              <span className="text-green-500">✓</span>
              <span>Use a clear, descriptive title</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500">✓</span>
              <span>Choose the most relevant category</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500">✓</span>
              <span>Provide detailed context and examples</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500">✓</span>
              <span>Be respectful and constructive</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CreatePost