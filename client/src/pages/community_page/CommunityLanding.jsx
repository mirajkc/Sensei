import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import useAppContext from '../../context/AppContext.jsx'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate  } from 'react-router-dom'

const CommunityLanding = () => {
  const { theme, loggedIn } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [allPost, setAllPost] = useState([])
  const [searchKeyword, setSearchKeyword] = useState("")
  const [sortedLikes, setSortedLikes] = useState("")
  const [sortedDislikes, setSortedDislikes] = useState("")
  const [sortedCreatedAt, setSortedCreatedAt] = useState("")
  const [sortedUpdatedAt, setSortedUpdatedAt] = useState("")
  const [sortedTags, setSortedTags] = useState("")
  const navigate = useNavigate()

  //* make the api call to get all the post
  const getAllPost = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/post/getallpost')
      if (!data.success) {
        return toast.error(data.message)
      } else {
        setAllPost(data.posts)
      }
    } catch (error) {
      return toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  //* all the searching and sorting methods
  const filteredPost = allPost
    //* search bar specific to community
    .filter((post) => {
      if (searchKeyword.length === 0) return true
      return post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
             post.user?.name.toLowerCase().includes(searchKeyword.toLowerCase())
    })
    //* sort by likes asc or des
    .sort((a, b) => {
      if (sortedLikes === "asc") {
        return a.likes.length - b.likes.length
      }
      if (sortedLikes === "des") {
        return b.likes.length - a.likes.length
      }

      //* sort by dislikes
      if (sortedDislikes === "asc") {
        return a.dislikes.length - b.dislikes.length
      }
      if (sortedDislikes === "des") {
        return b.dislikes.length - a.dislikes.length
      }

      //* sort by created At
      if (sortedCreatedAt === 'asc') return new Date(a.createdAt) - new Date(b.createdAt)
      if (sortedCreatedAt === 'des') return new Date(b.createdAt) - new Date(a.createdAt)

      //* sort by UpdatedAt
      if (sortedUpdatedAt === 'asc') return new Date(a.updatedAt) - new Date(b.updatedAt)
      if (sortedUpdatedAt === 'des') return new Date(b.updatedAt) - new Date(a.updatedAt)

      return 0
    })
    //* filter by tags
    .filter((post) => {
      if (sortedTags.length === 0) return true;
      return post.tags.toLowerCase().includes(sortedTags.toLowerCase());
    })

  //* tags category
  const availableTags = [
    'Question', 'Discussion', 'Project', 'Announcement', 'Other'
  ]

  //* reset all filters
  const resetFilters = () => {
    setSortedLikes("")
    setSortedDislikes("")
    setSortedCreatedAt("")
    setSortedUpdatedAt("")
    setSortedTags("")
    setSearchKeyword("")
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleCreatePost = () => {
    if(!loggedIn){
      navigate('/login')
      scrollTo(0,0)
      return
    }
    window.location.href = '/createpost'
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  useEffect(() => {
    getAllPost()
  }, [])

  return (
    <div className={`min-h-screen transition-all duration-300 ${theme === 'dark'
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
      }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${theme === 'dark'
            ? 'from-blue-400 via-purple-400 to-pink-400'
            : 'from-blue-600 via-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>
            Welcome to Our Community
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Create wonderful community posts and connect with fellow learners
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <svg className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search community posts or authors..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl text-lg transition-all duration-300 ${theme === 'dark'
                ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-purple-500'
                : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500'
                } border-2 focus:outline-none focus:ring-4 focus:ring-opacity-20 ${theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                }`}
            />
          </div>
        </motion.div>

        {/* Sorting Mechanisms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`${theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white/70 border-gray-200'
            } backdrop-blur-sm border rounded-2xl p-6 mb-8 shadow-xl`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Sort by Likes
              </label>
              <select
                value={sortedLikes}
                onChange={(e) => setSortedLikes(e.target.value)}
                className={`w-full p-3 rounded-lg transition-all duration-300 ${theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } border focus:outline-none focus:ring-2 focus:ring-opacity-20 ${theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                  }`}
              >
                <option value="">Default</option>
                <option value="asc">Ascending</option>
                <option value="des">Descending</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Sort by Dislikes
              </label>
              <select
                value={sortedDislikes}
                onChange={(e) => setSortedDislikes(e.target.value)}
                className={`w-full p-3 rounded-lg transition-all duration-300 ${theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } border focus:outline-none focus:ring-2 focus:ring-opacity-20 ${theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                  }`}
              >
                <option value="">Default</option>
                <option value="asc">Ascending</option>
                <option value="des">Descending</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Sort by Created Date
              </label>
              <select
                value={sortedCreatedAt}
                onChange={(e) => setSortedCreatedAt(e.target.value)}
                className={`w-full p-3 rounded-lg transition-all duration-300 ${theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } border focus:outline-none focus:ring-2 focus:ring-opacity-20 ${theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                  }`}
              >
                <option value="">Default</option>
                <option value="asc">Oldest First</option>
                <option value="des">Newest First</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Sort by Updated Date
              </label>
              <select
                value={sortedUpdatedAt}
                onChange={(e) => setSortedUpdatedAt(e.target.value)}
                className={`w-full p-3 rounded-lg transition-all duration-300 ${theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } border focus:outline-none focus:ring-2 focus:ring-opacity-20 ${theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                  }`}
              >
                <option value="">Default</option>
                <option value="asc">Oldest First</option>
                <option value="des">Recently Updated</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
            >
              Clear All Filters
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Create Post and Tags */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            {/* Create Post Button */}
            <div className="mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreatePost}
                className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-300 ${theme === 'dark'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-green-500/25'
                  } transform hover:-translate-y-1`}
              >
                <svg className="inline w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Post
              </motion.button>
            </div>

            {/* Tags Filter */}
            <div className={`${theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white/70 border-gray-200'
              } backdrop-blur-sm border rounded-xl p-6 shadow-xl`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                Filter by Tags
              </h3>
              <div className="space-y-3">
                {availableTags.map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSortedTags(sortedTags === tag ? "" : tag)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${sortedTags === tag
                      ? theme === 'dark'
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-blue-600 text-white shadow-lg'
                      : theme === 'dark'
                        ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Posts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            {loading ? (
              <div className="text-center py-12">
                <div className={`inline-block animate-spin rounded-full h-16 w-16 border-b-2 ${theme === 'dark' ? 'border-purple-500' : 'border-blue-500'
                  }`}></div>
                <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  Loading community posts...
                </p>
              </div>
            ) : filteredPost.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className={`${theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/70 border-gray-200'
                  } backdrop-blur-sm border rounded-xl p-12 text-center shadow-xl`}
              >
                <svg className={`mx-auto w-16 h-16 mb-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className={`text-2xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                  No Posts Found
                </h3>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  Try adjusting your search or filters to find more posts
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {filteredPost.map((post) => (
                  <motion.div
                    key={post._id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className={`${theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                      : 'bg-white/70 border-gray-200 hover:bg-white/90'
                      } backdrop-blur-sm border rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl`}
                  >
                    <div className="p-6">
                      {/* Author Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={post.user?.picture || 'https://via.placeholder.com/64x64?text=U'}
                            alt={post.user?.name || 'Anonymous'}
                            className="w-16 h-16 rounded-full object-cover ring-4 ring-opacity-20 ring-blue-500"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <div>
                              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                } truncate`}>
                                {post.user?.name || 'Anonymous User'}
                              </h3>
                              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                } text-sm flex items-center gap-2`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatDate(post.createdAt)}
                              </p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${theme === 'dark'
                              ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30'
                              : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200'
                              }`}>
                              {post.tags}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="ml-20">
                        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                          } leading-tight hover:text-blue-500 transition-colors cursor-pointer`}>
                          {post.title}
                        </h2>
                        
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          } text-base leading-relaxed mb-6 line-clamp-3`}>
                          {post.content}
                        </p>

                        {/* Engagement Stats */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-4 border-t border-opacity-20 border-gray-400">
                          <div className="flex items-center gap-6">
                            <div className={`flex items-center gap-2 ${
                              theme === 'dark' ? 'text-red-400' : 'text-red-500'
                            }`}>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm font-medium">{post.likes.length} likes</span>
                            </div>
                            
                            <div className={`flex items-center gap-2 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                              </svg>
                              <span className="text-sm font-medium">{post.dislikes.length} dislikes</span>
                            </div>
                            
                            <div className={`flex items-center gap-2 ${
                              theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
                            }`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span className="text-sm font-medium">{post.comments.length} comments</span>
                            </div>
                          </div>
                          
                          <div
                          onClick={() => {
                            navigate(`/singlepost/${post._id}`)
                            scrollTo(0,0)
                          }}
                           className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${
                            theme === 'dark' 
                              ? 'text-purple-400 hover:text-purple-300' 
                              : 'text-blue-600 hover:text-blue-700'
                          }`}>
                            Read More →
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CommunityLanding