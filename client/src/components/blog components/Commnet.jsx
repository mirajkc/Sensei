import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import useAppContext from '../../context/AppContext.jsx'

const Comment = ({ comments, blogId , getBlogDetails }) => {
  const { theme, loggedIn } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const containerStyles = theme === 'dark' 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900'
  
  const cardStyles = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
  
  const inputStyles = theme === 'dark'
    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
  
  const buttonStyles = theme === 'dark'
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-blue-500 hover:bg-blue-600 text-white'


  const addNewComment = async (e) => {
    e.preventDefault()
    
    if (!loggedIn) {
      return toast.error('Please log in to add a comment')
    }
    
    if (!comment.trim()) {
      return toast.error('Please enter a comment')
    }

    try {
      setSubmitting(true)
      const { data } = await axios.post(`/api/blog/addnewcomment/${blogId}`, { comment })
      
      if (!data.success) {
        return toast.error(data.message)
      }
      
      toast.success(data.message)
      getBlogDetails()
      setComment("") 
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const commentVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  if (loading) {
    return (
      <motion.div 
        className={`${containerStyles} p-6 rounded-lg shadow-sm`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <motion.div
            className={theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}
            style={{ width: 8, height: 8, borderRadius: '50%' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-lg font-medium">Loading comments...</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={`${containerStyles} transition-colors duration-300`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Comments Section */}
      <div className="mb-8">
        <motion.h3 
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Comments ({comments?.length || 0})
        </motion.h3>
        
        <AnimatePresence mode="wait">
          {comments?.length === 0 ? (
            <motion.div
              key="no-comments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`${cardStyles} p-8 rounded-lg border text-center`}
            >
              <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg font-medium mb-2">No comments yet</p>
                <p className="text-sm">Be the first to share your thoughts!</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="comments-list"
              className="space-y-4"
              variants={containerVariants}
            >
              {comments?.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  variants={commentVariants}
                  className={`${cardStyles} p-4 sm:p-6 rounded-lg border transition-all duration-200 hover:shadow-md`}
                >
                  <div className="flex items-start space-x-4">
                    {/* User Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img 
                        src={item.user?.picture || '/default-avatar.png'} 
                        alt={item.user?.name || 'User'}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-opacity-20 border-current"
                        onError={(e) => {
                          e.target.src = '/default-avatar.png'
                        }}
                      />
                    </motion.div>
                    
                    {/* Comment Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h4 className="font-semibold text-sm sm:text-base truncate">
                          {item.user?.name || 'Anonymous User'}
                        </h4>
                        <time 
                          className={`text-xs sm:text-sm mt-1 sm:mt-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                          dateTime={item.createdAt}
                        >
                          {new Date(item.createdAt || item.createdt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed break-words">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Comment Form */}
      <motion.div
        variants={formVariants}
        className={`${cardStyles} p-4 sm:p-6 rounded-lg border`}
      >
        <h4 className="text-lg font-semibold mb-4">Add a Comment</h4>
        
        {!loggedIn ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <p>Please log in to add a comment</p>
          </motion.div>
        ) : (
          <form onSubmit={addNewComment} className="space-y-4">
            <div>
              <label 
                htmlFor="comment-input"
                className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Your Comment
              </label>
              <motion.textarea
                id="comment-input"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className={`${inputStyles} w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 resize-vertical min-h-[100px]`}
                disabled={submitting}
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            
            <div className="flex justify-end">
              <motion.button
                type="submit"
                disabled={submitting || !comment.trim()}
                className={`${buttonStyles} px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                {submitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Post Comment</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Comment 