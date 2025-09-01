import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAppContext from '../context/AppContext.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  TriangleAlert,
  ThumbsDown, 
  ThumbsUp, 
  Globe, 
  Monitor, 
  Database, 
  Code, 
  Award, 
  BookOpen,
  Clock,
  MessageCircle,
  Eye,
  Star,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Users,
  Trophy,
  Youtube,
  Linkedin,
  Github,
  Twitter
} from 'lucide-react'
import { motion } from 'framer-motion'

const SellerDetail = () => {
  const [details, setDetails] = useState(null)
  const [seller, setSeller] = useState({})
  const [sellerCourses, setSellerCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const { theme,loggedIn } = useAppContext() 
  const navigate = useNavigate()
  const { sellerId } = useParams()

  // API call to get the seller data
  const getSellerData = async() => {
    try {
      setLoading(true)
      const {data} = await axios.get(`/api/seller/getSellerDetails/${sellerId}`)
      if(!data.success){
        toast.error(data.message)
      } else {
        setDetails(data)
        setSeller(data.seller)
        setSellerCourses(data.courses)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Like seller
  const likeSeller = async() => {
    if(!loggedIn){
      navigate('/login')
      scrollTo(0,0)
    }
    try { 
      setLoading(true)
      const {data} = await axios.post(`/api/seller/likeseller/${sellerId}`)
      if(!data.success){
        toast.error(data.message)
      } else {
        toast.success(data.message)
        await getSellerData()
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Dislike seller
  const disLikeSeller = async() => {
    if(!loggedIn){
      navigate('/login')
      scrollTo(0,0)
    }
    try {
      setLoading(true)
      const {data} = await axios.post(`/api/seller/dislikeseller/${sellerId}`)
      if(!data.success){
        toast.error(data.message)
      } else {
        toast.success(data.message)
        await getSellerData()
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSellerData() 
  }, [sellerId])

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Development':
        return <Globe className="w-4 h-4" />;
      case 'Front End Development':
        return <Monitor className="w-4 h-4" />;
      case 'Back End Development':
        return <Database className="w-4 h-4" />;
      case 'Data Science':
        return <Code className="w-4 h-4" />;
      case 'Digital Marketing':
        return <Award className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  // Get social icon
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-3 h-3 ${i < fullStars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  if(loading){
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="max-w-8xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Section - Main Content */}
          <div className="flex-1 lg:w-2/3">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                INSTRUCTOR
              </span>
              <h1 className="text-3xl font-bold mt-2 mb-3">{seller?.name}</h1>
              <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {seller?.bio}
              </p>
              
              {/* Quick Stats */}
              <div className="flex gap-8 mt-6">
                <div>
                  <div className="text-2xl font-bold">1,234</div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Total learners
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    {details?.rating ?? 0}
                  </div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Total rating
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About Me Section */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration : 0.6 }}
              className={`rounded-lg p-6 mb-8 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-sm`}
            >
              <h2 className="text-xl font-semibold mb-4">About me</h2>
              <p className={`leading-relaxed mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Hey I am {seller?.name}. {seller?.bio}. I have {seller?.experience}.
                I am qualified in {seller?.qualification}. I come from {seller?.location}.
                I am a pro in {seller?.specialization}.
              </p>

              {/* Professional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Briefcase className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {seller?.experience}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {seller?.qualification}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {seller?.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {seller?.specialization}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Courses Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-6">
                My courses ({details?.totalCourses ?? 0})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 max-w-120 gap-2">
                {sellerCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    onClick={() => { navigate(`/coursedetail/${course._id}`); window.scrollTo(0,0) }}
                    className={`rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border cursor-pointer ${
                      theme === "dark" 
                        ? "bg-gray-800 border-gray-700 hover:border-gray-600" 
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Course Thumbnail */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSkillLevelColor(course.skillLevel)}`}>
                          {course.skillLevel}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Title */}
                      <h3 className="font-semibold text-base mb-2 line-clamp-2 leading-tight">
                        {course.title}
                      </h3>

                      {/* Category */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-blue-600">
                          {getCategoryIcon(course.category)}
                        </span>
                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          {course.category}
                        </span>
                      </div>

                      {/* Course Info */}
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                              {course.totalHours}h
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-gray-400" />
                            <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                              {course.totalNumberOfLessons} lessons
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price and Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-blue-600">
                            ${course.discountedPrice}
                          </span>
                          {course.discountedPrice < course.price && (
                            <span className={`text-sm line-through ${
                              theme === "dark" ? "text-gray-500" : "text-gray-400"
                            }`}>
                              ${course.price}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            {renderStars(4.5)}
                          </div>
                          <span className={`text-sm ml-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            (4.5)
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {sellerCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className={`w-12 h-12 mx-auto mb-3 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
                  <p className={theme === "dark" ? "text-gray-500" : "text-gray-600"}>
                    No courses available yet
                  </p>
                </div>
              )}
             </motion.div>
          </div>

          {/* Right Section - Seller Profile */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/3 w-full"
          >
            <div className={`sticky top-6 w-80 rounded-lg mx-10 p-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } shadow-sm border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
              
              {/* Profile Image */}
              <div className="text-center mb-6">
                <img 
                  src={seller?.image} 
                  alt={seller?.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4" 
                />
                <h3 className="font-semibold text-lg">{seller?.name}</h3>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {seller?.specialization}
                </p>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {seller?.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Member since {new Date(seller?.createdAt).getFullYear()}
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-sm">Connect</h4>
                <div className="flex flex-wrap gap-2">
                  {seller?.socialLinks && Object.entries(seller.socialLinks).map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className={`p-2 rounded-lg transition-colors ${
                        theme === "dark" 
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                      }`}
                    >
                      {getSocialIcon(platform)}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Like/Dislike */}
              <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-3 text-sm">Rate instructor</h4>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={likeSeller}
                    disabled={loading}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium flex-1 justify-center transition-colors ${
                      theme === "dark"
                        ? "bg-green-900/20 text-green-400 border border-green-800 hover:bg-green-900/30"
                        : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{details?.totalLike ?? 0}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={disLikeSeller}
                    disabled={loading}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium flex-1 justify-center transition-colors ${
                      theme === "dark"
                        ? "bg-red-900/20 text-red-400 border border-red-800 hover:bg-red-900/30"
                        : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>{details?.totalDislike ?? 0}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SellerDetail