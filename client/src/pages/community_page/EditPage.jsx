import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import useAppContext from '../../context/AppContext'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EditPage = () => {
  const { theme } = useAppContext()
  const [loading, setLoading] = useState(false)
  const { postId } = useParams()
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const navigate = useNavigate()

  //* get the details by postId
  const getPostDetail = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/post/getsinglepost/${postId}`)
      if (!data.success) {
        return toast.error(data.message)
      }
      if (data.success) {
        setPostTitle(data.post.title)
        setPostContent(data.post.content)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPostDetail()
  }, [postId])

  //* update the post details
  const updatePost = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(`/api/post/editPost/${postId}`, {
        title: postTitle,
        content: postContent
      })
      if (!data.success) {
        return toast.error(data.message)
      }
      if (data.success) {
        toast.success(data.message)
        navigate(`/singlepost/${postId}`)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(`/singlepost/${postId}`)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  if (loading && !postTitle && !postContent) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "dark" 
          ? "bg-gray-900 text-white" 
          : "bg-gray-50 text-gray-900"
      }`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
            theme === "dark" ? "border-blue-400" : "border-blue-600"
          }`}></div>
          <p className="text-sm font-medium">Loading post details...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === "dark" 
        ? "bg-gray-900 text-white" 
        : "bg-gray-50 text-gray-900"
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Edit Post
            </h1>
            <p className={`text-sm md:text-base ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Update your post content and title
            </p>
          </motion.div>

          {/* Edit Form */}
          <motion.div
            variants={itemVariants}
            className={`rounded-lg shadow-sm border p-6 md:p-8 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Post Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Enter your post title..."
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  disabled={loading}
                />
              </div>

              {/* Content Textarea */}
              <div>
                <label
                  htmlFor="content"
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Post Content
                </label>
                <textarea
                  id="content"
                  rows={12}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Write your post content here..."
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none resize-vertical min-h-[200px] ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  disabled={loading}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={updatePost}
                  disabled={loading || !postTitle.trim() || !postContent.trim()}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Updating...</span>
                    </div>
                  ) : (
                    "Update Post"
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  disabled={loading}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium border transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-500"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500"
                  }`}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Post Preview Info */}
          {postTitle && postContent && (
            <motion.div
              variants={itemVariants}
              className={`rounded-lg border p-4 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${
                  theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                }`}></div>
                <h4 className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-blue-800"
                }`}>
                  Preview Info
                </h4>
              </div>
              <div className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-blue-700"
              }`}>
                <p>Title: {postTitle.length} characters</p>
                <p>Content: {postContent.length} characters</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default EditPage