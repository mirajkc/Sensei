import React from 'react'
import useAppContext from '../context/AppContext.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Star, BookOpen, Play, ChevronRight } from 'lucide-react'

const SearchPage = () => {
  const { theme } = useAppContext()
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])
  const query = searchParams.get('query');
  const navigate = useNavigate()

  useEffect(() => {
    if (!query) {
      toast.error('Search field can\'t be empty');
      navigate('/home');
    }
  }, [query, navigate]);

  const fetchSearchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/course/search?query=${query}`);
      setCourses(data?.course || []);
      console.log('API Response:', data);
      console.log('Courses set:', data?.course);
    } catch (error) {
      toast.error(`Some error occurred: ${error.message}`);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) fetchSearchData();
  }, [query]);


  const safeCourses = Array.isArray(courses) ? courses : [];

  // Animation variants
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
    visible: { opacity: 1, y: 0 }
  }

  const cardHoverVariants = {
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-xl p-6 ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          } shadow-sm animate-pulse`}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-80 h-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              <div className="flex gap-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const CourseCard = ({ course, index }) => {
    if (!course) return null;

    const formatPrice = (price) => {
      if (!price || isNaN(price)) return '$0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price);
    }

    const formatDuration = (hours) => {
      if (!hours || isNaN(hours)) return '0m';
      const totalMinutes = Math.round(hours * 60);
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      return h > 0 ? `${h}h ${m}m` : `${m}m`;
    }

    return (
      <motion.div
        variants={itemVariants}
        whileHover="hover"
        className={`rounded-xl overflow-hidden transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700 hover:border-blue-500/50' 
            : 'bg-white border border-gray-200 hover:border-blue-300'
        } shadow-sm hover:shadow-xl group cursor-pointer`}
        onClick={() => course?._id && navigate(`/coursedetail/${course._id}`)}
      >
        <motion.div variants={cardHoverVariants}>
          <div className="flex flex-col lg:flex-row">
            {/* Thumbnail */}
            <div className="relative w-full lg:w-80 h-48 lg:h-auto overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course?.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
             
              
              {/* Category badge */}
              {course?.category && (
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {course.category}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex flex-col h-full">
                {/* Title and Description */}
                <div className="flex-1">
                  <motion.h3 
                    className={`text-xl font-bold mb-3 line-clamp-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                    whileHover={{ color: theme === 'dark' ? '#3B82F6' : '#1D4ED8' }}
                  >
                    {course?.title || 'Untitled Course'}
                  </motion.h3>
                  
                  <p className={`text-sm mb-4 line-clamp-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {course?.description || 'No description available.'}
                  </p>

                  {/* Course Stats */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className={`flex items-center gap-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Clock size={16} />
                      <span>{formatDuration(course?.totalHours)}</span>
                    </div>
                    
                    <div className={`flex items-center gap-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <BookOpen size={16} />
                      <span>{course?.totalNumberOfLessons || 0} lessons</span>
                    </div>

                    {course?.skillLevel && (
                      <div className={`flex items-center gap-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Users size={16} />
                        <span>{course.skillLevel}</span>
                      </div>
                    )}
                  </div>

                  {/* Language badge if available */}
                  {course?.language && (
                    <div className="mb-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {course.language}
                      </span>
                    </div>
                  )}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    {course?.discountedPrice && course?.price && course.discountedPrice < course.price ? (
                      <>
                        <span className={`text-2xl font-bold ${
                          theme === 'dark' ? 'text-green-400' : 'text-green-600'
                        }`}>
                          {formatPrice(course.discountedPrice)}
                        </span>
                        <span className={`text-lg line-through ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {formatPrice(course.price)}
                        </span>
                      </>
                    ) : (
                      <span className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {formatPrice(course?.price)}
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                    disabled={!course?._id}
                  >
                    View Course
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Empty state component
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
    >
      <div className={`w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <BookOpen size={48} className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} />
      </div>
      
      <h3 className={`text-2xl font-bold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        No courses found
      </h3>
      
      <p className={`text-lg mb-8 max-w-md mx-auto ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        We couldn't find any courses matching "{query || 'your search'}". Try searching with different keywords.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/home')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium"
      >
        Browse All Courses
      </motion.button>
    </motion.div>
  )

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Search Results
            </h1>
            
            <div className={`flex flex-col sm:flex-row sm:items-center gap-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p className="text-lg">
                Showing results for: <span className="font-semibold text-blue-600">"{query || ''}"</span>
              </p>
              
              {!loading && safeCourses.length > 0 && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-gray-300' 
                    : 'bg-white text-gray-600'
                } border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  {safeCourses.length} {safeCourses.length === 1 ? 'course' : 'courses'} found
                </div>
              )}
            </div>
          </motion.div>

          {/* Content */}
          <div>
            {loading ? (
              <LoadingSkeleton />
            ) : safeCourses.length === 0 ? (
              <EmptyState />
            ) : (
              <motion.div 
                variants={itemVariants}
                className="space-y-6"
              >
                {safeCourses.map((course, index) => (
                  <CourseCard 
                    key={course?._id || index} 
                    course={course} 
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SearchPage