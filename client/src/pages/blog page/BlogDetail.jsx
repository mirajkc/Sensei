import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Heart, ThumbsDown, Star, Calendar, User, Tag, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import useAppContext from '../../context/AppContext.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import gif from '../../assets/giphy.gif'

const BlogDetail = () => {
  const [loading, setLoading] = useState(false)
  const { theme } = useAppContext()
  const [blogData, setBlogData] = useState({})
  const [isLiking, setIsLiking] = useState(false)
  const [isDisliking, setIsDisliking] = useState(false)
  const [showFullContent, setShowFullContent] = useState(false)
  const navigate = useNavigate()
  const { blogId } = useParams()
  const [allBlogs, setAllBlogs] = useState([])


  const themeClasses = {
    container: theme === 'dark' 
      ? 'bg-gray-900 text-white min-h-screen' 
      : 'bg-gray-50 text-gray-900 min-h-screen',
    
    card: theme === 'dark'
      ? 'bg-gray-800 border-gray-700 shadow-xl'
      : 'bg-white border-gray-200 shadow-lg',
    
    text: {
      primary: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      muted: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
    },
    
    accent: theme === 'dark' 
      ? 'text-blue-400 bg-blue-900/30' 
      : 'text-blue-600 bg-blue-50',
    
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    
    loading: theme === 'dark' 
      ? 'bg-gray-900' 
      : 'bg-white',

    sidebar: theme === 'dark'
      ? 'bg-gray-800/50 border-gray-700'
      : 'bg-white/80 border-gray-200',

    button: theme === 'dark'
      ? 'bg-blue-600 hover:bg-blue-700 text-white'
      : 'bg-blue-600 hover:bg-blue-700 text-white'
  }


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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

  const sidebarVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.3 }
    }
  }

  // API call to get blog details
  const getBlogDetails = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/blog/getsingleblog/${blogId}`)
      if (!data.success) {
        return toast.error(data.message)
      }
      setBlogData(data.blog)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // API call to get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/getallblog')
      if (!data.success) {
        return toast.error(data.message)
      }
      setAllBlogs(data.blogs)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Handle like functionality
  const handleLike = async () => {
    try {
      setIsLiking(true)
      const { data } = await axios.post(`/api/blog/like/${blogId}`)
      if (!data.success) {
        return toast.error(data.message)
      }
      setBlogData(data.blog)
      toast.success('Blog liked!')
    } catch (error) {
      toast.error(error.message || 'Failed to like blog')
    } finally {
      setIsLiking(false)
    }
  }

  // Handle dislike functionality
  const handleDislike = async () => {
    try {
      setIsDisliking(true)
      const { data } = await axios.post(`/api/blog/dislike/${blogId}`)
      if (!data.success) {
        return toast.error(data.message)
      }
      setBlogData(data.blog)
      toast.success('Blog disliked!')
    } catch (error) {
      toast.error(error.message || 'Failed to dislike blog')
    } finally {
      setIsDisliking(false)
    }
  }

  // Format content for better display
  const formatContent = (content) => {
    if (!content) return ''
    
    return content
      .split('\n')
      .filter(paragraph => paragraph.trim() !== '')
      .map(paragraph => paragraph.trim())
      .join('\n\n')
  }

  // Truncate content to first 1000 characters
  const getTruncatedContent = (content) => {
    if (!content) return ''
    const formatted = formatContent(content)
    
    if (formatted.length <= 1000) {
      return formatted
    }
    
    return showFullContent ? formatted : formatted.substring(0, 1000) + '...'
  }



  useEffect(() => {
    getBlogDetails()
    getAllBlogs()
  }, [blogId])

  // Loading state
  if (loading) {
    return (
      <div className={`max-w-screen max-h-screen flex justify-center items-center ${themeClasses.loading}`}>
        <img src={gif} className='w-32 h-32 object-contain' alt="Loading..." />
      </div>
    )
  }


  return (
    <div className={themeClasses.container}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Content - Left Side (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <motion.div 
              className="relative mb-6 rounded-xl overflow-hidden"
              variants={itemVariants}
            >
              <img 
                src={blogData.thumbnail} 
                alt={blogData.title}
                className="w-full h-48 md:h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>

            {/* Main Blog Content */}
            <motion.article 
              className={`${themeClasses.card} rounded-xl border p-6 md:p-8`}
              variants={itemVariants}
            >
              {/* Category Badge */}
              <motion.div 
                className="mb-4"
                variants={itemVariants}
              >
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${themeClasses.accent}`}>
                  <Tag className="w-4 h-4 mr-2" />
                  {blogData.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight ${themeClasses.text.primary}`}
                variants={itemVariants}
              >
                {blogData.title}
              </motion.h1>

              {/* Meta Information */}
              <motion.div 
                className={`flex flex-wrap items-center gap-4 pb-4 mb-6 border-b ${themeClasses.border}`}
                variants={itemVariants}
              >
                <div className={`flex items-center text-sm ${themeClasses.text.secondary}`}>
                  <User className="w-4 h-4 mr-2" />
                  <span className="font-medium">{blogData.createdBy}</span>
                </div>
                
                <div className={`flex items-center text-sm ${themeClasses.text.muted}`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(blogData.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className={`flex items-center text-sm ${themeClasses.text.muted}`}>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Updated: {new Date(blogData.updatedAt).toLocaleDateString()}</span>
                </div>
              </motion.div>

              {/* Engagement Stats */}
              <motion.div 
                className="flex flex-wrap items-center gap-6 mb-6"
                variants={itemVariants}
              >
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`flex items-center transition-all duration-200 hover:scale-105 ${
                    isLiking ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-500'
                  } ${themeClasses.text.secondary}`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isLiking ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold">{blogData.likes?.length || 0}</span>
                  <span className="ml-1">Likes</span>
                </button>
                
                <button
                  onClick={handleDislike}
                  disabled={isDisliking}
                  className={`flex items-center transition-all duration-200 hover:scale-105 ${
                    isDisliking ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-600'
                  } ${themeClasses.text.secondary}`}
                >
                  <ThumbsDown className={`w-5 h-5 mr-2 ${isDisliking ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold">{blogData.dislikes?.length || 0}</span>
                  <span className="ml-1">Dislikes</span>
                </button>
                
                <div className={`flex items-center ${themeClasses.text.secondary}`}>
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className="font-semibold">{blogData.rating || 'N/A'}</span>
                  <span className="ml-1">Rating</span>
                </div>
              </motion.div>

              {/* Blog Content with See More/Less */}
              <motion.div 
                className={`mb-6 ${themeClasses.text.primary}`}
                variants={itemVariants}
              >
                <div className="space-y-4 leading-relaxed">
                  {getTruncatedContent(blogData.content)
                    .split('\n\n')
                    .map((paragraph, index) => (
                      <p 
                        key={index} 
                        className={`text-base leading-7 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}
                        style={{ textAlign: 'justify' }}
                      >
                        {paragraph}
                      </p>
                    ))
                  }
                </div>

                {/* See More/Less Button */}
                {blogData.content && formatContent(blogData.content).length > 1000 && (
                  <motion.div 
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      onClick={() => setShowFullContent(!showFullContent)}
                      className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${themeClasses.button} shadow-md hover:shadow-lg`}
                    >
                      {showFullContent ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          See Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          See More
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </motion.article>

            {/* Comments Section */}
            <motion.section 
              className={`${themeClasses.card} rounded-xl border p-6 md:p-8 mt-6`}
              variants={itemVariants}
            >
              <h2 className={`text-xl font-bold mb-4 ${themeClasses.text.primary}`}>
                Comments
              </h2>
              <p className={themeClasses.text.muted}>
                Comment component will be mounted here
              </p>
            </motion.section>
          </div>

          {/* Sidebar - Right Side (1/3 width on large screens) */}
          <motion.div 
            className="lg:col-span-1"
            variants={sidebarVariants}
          >
            {/* More Articles */}
            <div className={`${themeClasses.sidebar} rounded-xl border p-6 mb-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>
                More Articles
              </h3>
              {allBlogs.length > 0 ? (
                <div className="space-y-4 max-h-220 overflow-y-auto">
                  {allBlogs.filter((blog) => { return blog._id.toLowerCase() !== blogId.toLowerCase()   }).map((blog) => (
                    <motion.div
                      key={blog._id}
                      className={`p-3 rounded-lg border ${themeClasses.border} hover:shadow-md transition-all duration-200 cursor-pointer`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => navigate(`/roadmap/${blog._id}`)}
                    >
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-24 object-cover rounded-md mb-3"
                      />
                      <h4 className={`font-medium text-sm line-clamp-2 mb-2 ${themeClasses.text.primary}`}>
                        {blog.title}
                      </h4>
                      <div className="flex justify-between items-center">
                        <p className={`text-xs ${themeClasses.text.muted}`}>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded ${themeClasses.accent}`}>
                          {blog.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className={`text-sm ${themeClasses.text.muted}`}>
                  No other articles available
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className={`${themeClasses.sidebar} rounded-xl border p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${themeClasses.text.muted}`}>Reading Time</span>
                  <span className={`text-sm font-medium ${themeClasses.text.primary}`}>
                    {Math.ceil((blogData.content?.length || 0) / 200)} min
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${themeClasses.text.muted}`}>Category</span>
                  <span className={`text-sm font-medium ${themeClasses.text.primary}`}>
                    {blogData.category}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${themeClasses.text.muted}`}>Words</span>
                  <span className={`text-sm font-medium ${themeClasses.text.primary}`}>
                    ~{Math.ceil((blogData.content?.length || 0) / 5)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogDetail