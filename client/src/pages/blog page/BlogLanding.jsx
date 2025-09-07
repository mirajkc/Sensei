import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, Heart, User, Clock, Tag, TrendingUp } from 'lucide-react';

// Import your actual context hook
import useAppContext from '../../context/AppContext.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BlogLanding = () => {
  const { theme } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchKeyWord, setSearchKeyword] = useState("");
  const [createdAtFlow, setCreatedAtFlow] = useState("");
  const [updatedAtFlow, setUpdatedAtFlow] = useState("");
  const [sortByLikes, setSortByLikes] = useState("");
  const [sortByCategories, setSortByCategories] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate()

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data & AI",
    "Design & Creative",
    "Cybersecurity & DevOps",
    "Others"
  ];

  const getBlogDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/blog/getallblog');
      if (!data) return toast.error("No data returned");
      setData(data.blogs);
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setVisibleCount(prev => prev + 6);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredData = data
    .filter(blog => !searchKeyWord || blog.title.toLowerCase().includes(searchKeyWord.toLowerCase()))
    .filter(blog => !sortByCategories || blog.category.toLowerCase().includes(sortByCategories.toLowerCase()))
    .sort((a, b) => {
      if (createdAtFlow) {
        const diff = new Date(a.createdAt) - new Date(b.createdAt);
        return createdAtFlow === "desc" ? -diff : diff;
      }
      if (updatedAtFlow) {
        const diff = new Date(a.updatedAt) - new Date(b.updatedAt);
        return updatedAtFlow === "desc" ? -diff : diff;
      }
      if (sortByLikes) {
        const diff = a.likes.length - b.likes.length;
        return sortByLikes === "desc" ? -diff : diff;
      }
      return 0;
    });

  const displayedBlogs = filteredData.slice(0, visibleCount);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4 ${
              theme === 'dark' ? 'border-blue-400' : 'border-blue-600'
            }`}
          />
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Loading amazing content...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`text-4xl md:text-6xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Discover <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Amazing
              </span> Guides
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-xl md:text-2xl mb-8 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Next-gen tech insights: A sensei’s guide to career and innovation
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search for articles..."
              value={searchKeyWord}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Filters & Sorting
            </h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Category
                  </label>
                  <select
                    value={sortByCategories}
                    onChange={(e) => setSortByCategories(e.target.value)}
                    className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Sort by Date
                  </label>
                  <select
                    value={createdAtFlow}
                    onChange={(e) => setCreatedAtFlow(e.target.value)}
                    className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Default</option>
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Sort by Likes
                  </label>
                  <select
                    value={sortByLikes}
                    onChange={(e) => setSortByLikes(e.target.value)}
                    className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Default</option>
                    <option value="desc">Most Liked</option>
                    <option value="asc">Least Liked</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Updated
                  </label>
                  <select
                    value={updatedAtFlow}
                    onChange={(e) => setUpdatedAtFlow(e.target.value)}
                    className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Default</option>
                    <option value="desc">Recently Updated</option>
                    <option value="asc">Least Recently Updated</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-between mb-6"
        >
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {displayedBlogs.length} of {filteredData.length} articles
          </p>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <TrendingUp className="w-4 h-4 inline mr-1" />
            Trending Content
          </div>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {displayedBlogs.map((blog, index) => (
              blog && (
                <motion.article
                  key={blog._id || index}
                  variants={cardVariants}
                  layout
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} 
                    rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group`}

                    onClick={()=>{
                      navigate(`/roadmap/${blog._id}`);
                      scrollTo(0,0)
                    }}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        theme === 'dark'
                          ? 'bg-blue-900 text-blue-200'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        <Tag className="w-3 h-3 inline mr-1" />
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {blog.title}
                    </h2>

                    <p className={`text-sm mb-4 line-clamp-3 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {blog.content}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <User className="w-4 h-4" />
                        <span>{blog.createdBy}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Clock className="w-4 h-4" />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <span className={`flex items-center gap-1 text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Heart className="w-4 h-4" />
                          {blog.likes.length}
                        </span>
                        <span className={`flex items-center gap-1 text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          {blog.comments.length}
                        </span>
                      </div>
                      {blog.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {blog.rating} 
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Indicator */}
        {displayedBlogs.length < filteredData.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
            } shadow-lg`}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className={`w-5 h-5 border-2 border-t-transparent rounded-full ${
                  theme === 'dark' ? 'border-gray-400' : 'border-gray-500'
                }`}
              />
              <span>Loading more content...</span>
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredData.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
              🔍
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              No articles found
            </h3>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchKeyword("");
                setSortByCategories("");
                setCreatedAtFlow("");
                setUpdatedAtFlow("");
                setSortByLikes("");
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogLanding;