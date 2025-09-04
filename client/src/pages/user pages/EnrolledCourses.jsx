import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAppContext from '../../context/AppContext.jsx';
import { Search, Filter, Clock, User, BookOpen, Play, ArrowRight, Calendar, TrendingUp, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
  const { theme, userDetails } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [sortedDate, setSortedDate] = useState("");
  const [progressStatus, setProgressStatus] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [completeStatus, setCompleteStatus] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate()

  const sortedCourse = courses
    .filter(item =>
      searchKeyword === "" ? true : item.course.title.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .filter(item => 
      completeStatus === null ? true : completeStatus === "Completed" ? item.completed === true :
      item.completed === false
    )
    .sort((a, b) => {
      if (progressStatus === "Ascending") return a.progress - b.progress;
      if (progressStatus === "Descending") return b.progress - a.progress;
      return 0;
    })
    .sort((a, b) => {
      if (sortedDate === "Ascending") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortedDate === "Descending") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const getEnrolledCourseDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/getenrolledcourses');
      if (!data.success) {
        toast.error(data.message);
      } else {
        setCourses(data.enrolledCourses);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrolledCourseDetails();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress === 0) return 'from-gray-400 to-gray-500';
    if (progress < 50) return 'from-red-400 to-red-600';
    if (progress < 80) return 'from-yellow-400 to-yellow-600';
    return 'from-green-400 to-green-600';
  };

  const clearFilters = () => {
    setSortedDate("");
    setProgressStatus("");
    setCompleteStatus(null);
    setSearchKeyword("");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const filterVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      marginTop: 0
    },
    visible: { 
      opacity: 1,
      height: "auto",
      marginTop: 16,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="animate-pulse"
          >
            <div className={`h-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded mb-4 w-1/3`}></div>
            <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded mb-8 w-1/2`}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}
                >
                  <div className={`h-40 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded mb-4`}></div>
                  <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded mb-2`}></div>
                  <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded w-2/3`}></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{userDetails?.name || "User"}</span>
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's get back to learning amazing courses
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8 backdrop-blur-sm ${theme === 'dark' ? 'bg-opacity-50' : 'bg-opacity-70'}`}
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
            <input
              type="text"
              placeholder="Enter the thing that you want to search for..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-600'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-blue-50'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:scale-[1.02]`}
            />
          </div>

          {/* Filter Toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-md'
            }`}
          >
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Filter className="w-4 h-4" />
            </motion.div>
            <span>Filters</span>
          </motion.button>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Sort by Date
                  </label>
                  <select
                    value={sortedDate}
                    onChange={(e) => setSortedDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-900 focus:bg-blue-50'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="">Default</option>
                    <option value="Ascending">Oldest First</option>
                    <option value="Descending">Newest First</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Sort by Progress
                  </label>
                  <select
                    value={progressStatus}
                    onChange={(e) => setProgressStatus(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-900 focus:bg-blue-50'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="">Default</option>
                    <option value="Ascending">Low to High</option>
                    <option value="Descending">High to Low</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Completion Status
                  </label>
                  <select
                    value={completeStatus || ""}
                    onChange={(e) => setCompleteStatus(e.target.value === "" ? null : e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-900 focus:bg-blue-50'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="">All Courses</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Clear Filters */}
          <AnimatePresence>
            {(searchKeyword || sortedDate || progressStatus || completeStatus) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="mt-4 px-4 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 shadow-lg flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear All Filters</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Courses", value: sortedCourse.length, icon: BookOpen, color: "blue" },
            { label: "Completed", value: sortedCourse.filter(course => course.completed).length, icon: TrendingUp, color: "green" },
            { label: "In Progress", value: sortedCourse.filter(course => !course.completed && course.progress > 0).length, icon: Clock, color: "yellow" },
            { label: "Not Started", value: sortedCourse.filter(course => course.progress === 0).length, icon: Play, color: "gray" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg backdrop-blur-sm ${theme === 'dark' ? 'bg-opacity-50' : 'bg-opacity-70'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                  <motion.p 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className={`text-2xl font-bold text-${stat.color}-600`}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Course Cards */}
        {sortedCourse.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-12 shadow-lg text-center backdrop-blur-sm ${theme === 'dark' ? 'bg-opacity-50' : 'bg-opacity-70'}`}
          >
            <BookOpen className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              No courses found
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search criteria or clear filters to see all courses.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {sortedCourse.map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  layout
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.2 } 
                  }}
                  className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm ${theme === 'dark' ? 'bg-opacity-50' : 'bg-opacity-70'}`}
                >
                  {/* Course Thumbnail */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={item.course.thumbnail}
                      alt={item.course.title}
                      className="w-full h-48 object-cover"
                    />
                    <AnimatePresence>
                      {item.completed && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                        >
                          Completed
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                      {item.course.category}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className={`font-bold text-lg mb-3 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {item.course.title}
                    </h3>

                    {/* Instructor Info */}
                    <div className="flex items-center space-x-3 mb-4">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={item.course.seller.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.course.seller.name)}&background=6366f1&color=fff`}
                        alt={item.course.seller.name}
                        className="w-10 h-10 rounded-full object-cover shadow-md"
                      />
                      <div>
                        <p className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {item.course.seller.name}
                        </p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {item.course.seller.location || 'Instructor'}
                        </p>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center space-x-4">
                        <span className={`flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Clock className="w-4 h-4" />
                          <span>{item.course.totalHours || 0}h</span>
                        </span>
                        <span className={`flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <BookOpen className="w-4 h-4" />
                          <span>{item.course.totalNumberOfLessons || 0} lessons</span>
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.course.skillLevel === 'Beginner' ? 'bg-green-100 text-green-800' :
                        item.course.skillLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.course.skillLevel}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Progress
                        </span>
                        <motion.span 
                          key={item.progress}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className={`text-sm font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                          {Math.floor(item.progress)}%
                        </motion.span>
                      </div>
                      <div className={`w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3 overflow-hidden shadow-inner`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                          className={`h-3 bg-gradient-to-r ${getProgressColor(item.progress)} shadow-sm`}
                        ></motion.div>
                      </div>
                    </div>

                    {/* Enrollment Date */}
                    <div className="flex items-center mb-4">
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center space-x-1`}>
                        <Calendar className="w-3 h-3" />
                        <span>Enrolled: {formatDate(item.createdAt)}</span>
                      </span>
                    </div>

                    {/* Action Button */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={()=>{navigate(`/learn/${item.course?._id}/${item?.currentlyIn ?? item.course?.lessons[0]?._id }`); scrollTo(0,0)}}
                      className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg ${
                        item.progress === 0
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                          : item.completed
                          ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                          : 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white'
                      }`}
                    >
                      {item.progress === 0 ? (
                        <>
                          <Play className="w-5 h-5" />
                          <span>Start Learning</span>
                        </>
                      ) : item.completed ? (
                        <>
                          <BookOpen className="w-5 h-5" />
                          <span>Review Course</span>
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-5 h-5" />
                          <span>Continue Learning</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EnrolledCourses;