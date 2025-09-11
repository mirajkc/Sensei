import React, { useEffect, useState } from 'react'
import useAppContext from '../context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Users, 
  MessageCircle,
  ArrowRight,
  Clock,
  Star,
  Play,
  CheckCircle,
  Globe,
  Zap,
  Target,
  ChevronRight,
  UserCheck,
  BookMarked,
  Brain,
  Rocket,
  Shield,
  Trophy,
  PlayCircle,
  User,
  Calendar,
  Eye,
  ThumbsUp,
  Heart,
  Sparkles,
  TrendingDown,
  BarChart3,
  Code,
  Palette,
  Camera,
  Briefcase,
  GraduationCap,
  ChevronDown,
  Check,
  Quote,
  PieChart,
  Database,
  Layout,
  Server,
  Box
} from 'lucide-react'

const HomePage = () => {
  const { theme, loggedIn } = useAppContext()
  const navigate = useNavigate()
  
  const [isVisitor, setIsVisitor] = useState(!loggedIn)
  const [userData, setUserData] = useState(null)
  const [recommendedCourse, setRecommendedCourse] = useState([])
  const [blogsData, setBlogsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [postsData, setPostsData] = useState([])

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }

  // API functions
  const checkRole = async () => {
    if (!loggedIn) {
      setIsVisitor(true)
      return
    }
    
    try {
      const { data } = await axios.get("/api/user/getuserdataforhome")
      if (data.success && !data.isVisitor) {
        setIsVisitor(false)
        setUserData(data.user)
      } else {
        setIsVisitor(true)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      setIsVisitor(true)
    }
  }

  const getRecommendedCourse = async() => {
    try {
      setLoading(true)
      const {data} = await axios.get('/api/course/getAllCourseForUI')
      if(data.success) {
        setRecommendedCourse(data.courses)
      }
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const getCareerandRoadmap = async() => {
    try {
      const {data} = await axios.get('/api/blog/getallblog')
      if(data.success) {
        setBlogsData(data.blogs)
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    }
  }

  const getCommunityData = async() => {
    try {
      const { data} = await axios.get('/api/post/getallpost')
      if(data.success) {
        setPostsData(data.posts)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  useEffect(() => {
    checkRole()
    getRecommendedCourse()
    getCareerandRoadmap()
    getCommunityData()
  }, [loggedIn])

  // Enhanced stats for visitors
  const stats = [
    { icon: Users, label: "Active Learners", value: "5+", color: "from-blue-400 to-blue-600" },
    { icon: BookOpen, label: "Courses Available", value: recommendedCourse.length || "100+", color: "from-purple-400 to-purple-600" },
    { icon: Award, label: "Certificates Issued", value: "25+", color: "from-green-400 to-green-600" },
    { icon: Trophy, label: "Success Rate", value: "95%", color: "from-orange-400 to-orange-600" }
  ]

  const features = [
    {
      icon: Brain,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience and proven track records",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Zap,
      title: "Interactive Learning",
      description: "Hands-on projects, coding challenges, and practical exercises that reinforce learning",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Shield,
      title: "Lifetime Access",
      description: "Access your courses anytime, anywhere with no time limits and free updates",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Target,
      title: "Carrer Guide",
      description: "Shape your future with Sensei’s career-focused learning paths.",
      color: "from-orange-400 to-orange-600"
    }
  ]

const categories = [
  { icon: Code, name: "Web Development", color: "bg-blue-500" },
  { icon: PieChart, name: "Digital Marketing", color: "bg-purple-500" },
  { icon: Database, name: "Data Science", color: "bg-green-500" },
  { icon: Layout, name: "Front-End Development", color: "bg-orange-500" },
  { icon: Server, name: "Back-End Development", color: "bg-pink-500" },
  { icon: Box, name: "Others", color: "bg-indigo-500" }
];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      company: "TechCorp",
      image: "/api/placeholder/60/60",
      text: "This platform transformed my career. The courses are comprehensive and the instructors are top-notch.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "UX Designer",
      company: "DesignStudio",
      image: "/api/placeholder/60/60", 
      text: "The hands-on projects helped me build a portfolio that landed me my dream job.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist", 
      company: "DataCorp",
      image: "/api/placeholder/60/60",
      text: "Excellent content quality and the learning path feature kept me motivated throughout.",
      rating: 5
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          {!isVisitor && userData ? (
            // Enhanced Logged-in user hero
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                <div>
                  <motion.div variants={fadeInLeft}>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-6">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Welcome back to your learning journey
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                      Hello,{' '}
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        {userData.name}
                      </span>
                    </h1>
                    <p className="text-xl lg:text-2xl mb-8 opacity-80 leading-relaxed">
                      Continue building your future with personalized learning experiences
                    </p>
                  </motion.div>

                  <motion.div 
                    variants={fadeInLeft}
                    className="grid grid-cols-3 gap-6 mb-10"
                  >
                    <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                      <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-1">
                        {userData.enrolledCourses?.length || 0}
                      </div>
                      <div className="text-sm font-medium opacity-70">Enrolled Courses</div>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                      <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-1">
                        {Math.round(userData.enrolledCourses?.reduce((acc, course) => 
                          acc + (course.progress || 0), 0) / (userData.enrolledCourses?.length || 1)) || 0}%
                      </div>
                      <div className="text-sm font-medium opacity-70">Avg Progress</div>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                      <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-1">
                        {userData.certificates?.length || 0}
                      </div>
                      <div className="text-sm font-medium opacity-70">Certificates</div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInLeft} className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        navigate('/enrolledcourses')
                        scrollTo(0,0)
                      }}
                      className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-2xl"
                    >
                      <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Continue Learning
                    </button>
                    <button
                      onClick={() =>{
                         navigate('/discovercourses')
                         scrollTo(0,0)
                      }}
                      className={`group ${
                        theme === 'dark' 
                          ? 'bg-gray-800/80 hover:bg-gray-700 border-gray-600' 
                          : 'bg-white/80 hover:bg-gray-50 border-gray-300'
                      } backdrop-blur-sm border px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center hover:shadow-xl`}
                    >
                      Browse Courses
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </div>

                <motion.div variants={fadeInRight} className="mt-12 lg:mt-0">
                  <div className={`${
                    theme === 'dark' ? 'bg-gray-800/60' : 'bg-white/60'
                  } backdrop-blur-xl rounded-3xl p-8 border border-gray-200/20 shadow-2xl`}>
                    <h3 className="text-2xl font-bold mb-6">Your Progress So Far...</h3>
                    <div className="space-y-6">
                      {userData.enrolledCourses?.slice(0, 3).map((course, index) => (
                        <div key={index} className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 cursor-pointer">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <BookMarked className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-lg mb-1 truncate group-hover:text-blue-600 transition-colors">{course.course?.title || 'Course Title'}</h4>
                            <div className="flex items-center mt-2">
                              <div className={`flex-1 h-3 rounded-full mr-4 overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                                  style={{ width: `${course.progress || 0}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-blue-600">{course.progress || 0}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            // Enhanced Visitor hero
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-8">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Transform Your Career Today
                </div>
                <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
                  Master Skills.{' '}
                  <br className="hidden lg:block" />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Shape Tomorrow.
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl mb-12 opacity-80 max-w-4xl mx-auto leading-relaxed">
                  Join over 50,000 professionals advancing their careers with our comprehensive, 
                  expert-led courses designed for real-world success.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                <button
                  onClick={() => navigate('/signup')}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-2xl"
                >
                  Start Learning Free
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/discovercourses')}
                  className={`group ${
                    theme === 'dark' 
                      ? 'bg-gray-800/80 hover:bg-gray-700 border-gray-600' 
                      : 'bg-white/80 hover:bg-gray-50 border-gray-300'
                  } backdrop-blur-sm border-2 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center hover:shadow-2xl`}
                >
                  <PlayCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Explore Courses
                </button>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    variants={scaleIn}
                    transition={{ delay: index * 0.1 }}
                    className="group text-center"
                  >
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <stat.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-lg font-medium opacity-70">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center animate-bounce">
            <ChevronDown className="w-6 h-6 opacity-60" />
            <ChevronDown className="w-6 h-6 opacity-40 -mt-3" />
          </div>
        </motion.div>
      </section>

      {/* Enhanced Features Section - Only for visitors */}
      {isVisitor && (
        <section className={`py-24 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-8">
                <Target className="w-4 h-4 mr-2" />
                Why Choose Us
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-5xl lg:text-6xl font-bold mb-6">
                Built for Your Success
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl lg:text-2xl opacity-80 max-w-3xl mx-auto">
                Every feature designed to accelerate your learning and maximize career growth
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`group relative text-center p-8 rounded-3xl ${
                    theme === 'dark' ? 'bg-gray-800/60' : 'bg-white/60'
                  } backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/20 hover:border-gray-300/40 transform hover:-translate-y-2`}
                >
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                  <p className="opacity-80 leading-relaxed text-lg">{feature.description}</p>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section - Only for visitors */}
      {isVisitor && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-5xl font-bold mb-6">
                Explore Popular Categories
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl opacity-80 max-w-2xl mx-auto">
                Discover courses across diverse fields and find your perfect learning path
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group text-center p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                  } shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
                  onClick={() => navigate('/discovercourses')}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors">{category.name}</h3>

                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Featured Courses */}
      <section className={`py-24 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="flex items-center justify-between mb-16">
              <div>
                <motion.div variants={fadeInLeft} className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-6">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {isVisitor ? 'Featured Courses' : 'Recommended for You'}
                </motion.div>
                <motion.h2 variants={fadeInLeft} className="text-5xl font-bold mb-4">
                  {isVisitor ? 'Start Your Journey' : 'Continue Growing'}
                </motion.h2>
                <motion.p variants={fadeInLeft} className="text-xl opacity-80 max-w-2xl">
                  {isVisitor 
                    ? 'Hand-picked courses from industry experts to jumpstart your career'
                    : 'Personalized course recommendations based on your learning progress'
                  }
                </motion.p>
              </div>
              <motion.button
                variants={fadeInRight}
                onClick={() => navigate('/discovercourses')}
                className="group hidden lg:flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-300"
              >
                View All Courses
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 animate-pulse shadow-lg`}>
                    <div className="bg-gray-300 h-48 rounded-2xl mb-6"></div>
                    <div className="bg-gray-300 h-4 rounded mb-3"></div>
                    <div className="bg-gray-300 h-4 rounded w-3/4 mb-4"></div>
                    <div className="bg-gray-300 h-8 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedCourse.slice(0, isVisitor ? 6 : 3).map((course, index) => (
                  <motion.div
                    key={course._id}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className={`group ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-200/20 hover:border-gray-300/40`}
                    onClick={() => {
                      navigate(`/coursedetail/${course._id}`)
                      scrollTo(0,0)
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-2 rounded-full border border-white/20">
                        {course.skillLevel}
                      </div>
                      {course.discountedPrice < course.price && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg">
                          {Math.round((1 - course.discountedPrice / course.price) * 100)}% OFF
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white/90 text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{course.totalHours}h</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              <span>{course.totalNumberOfLessons}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                            <span>{course.seller?.rating || 5.0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="mb-4">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                          {course.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                        {course.description || "Master the fundamentals and advanced concepts with hands-on projects and real-world applications."}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          {course.discountedPrice < course.price && (
                            <span className="text-sm line-through text-gray-500 dark:text-gray-400">
                              ${course.price}
                            </span>
                          )}
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                              ${course.discountedPrice}
                            </span>
                            {course.discountedPrice === 0 && (
                              <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                                FREE
                              </span>
                            )}
                          </div>
                        </div>
                        <button className="group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center transform hover:scale-105">
                          Enroll Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div variants={fadeInUp} className="text-center mt-12 lg:hidden">
              <button
                onClick={() => navigate('/courses')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center"
              >
                View All Courses
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Only for visitors */}
      {isVisitor && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="text-center mb-16">
                <motion.div variants={fadeInUp} className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-sm font-medium mb-8">
                  <Quote className="w-4 h-4 mr-2" />
                  Student Success Stories
                </motion.div>
                <motion.h2 variants={fadeInUp} className="text-5xl font-bold mb-6">
                  Trusted by Professionals
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-xl opacity-80 max-w-2xl mx-auto">
                  Join thousands who have transformed their careers with our courses
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.2 }}
                    className={`relative p-8 rounded-3xl ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/20`}
                  >
                    <div className="absolute top-6 right-6">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                      <p className="text-lg leading-relaxed italic">"{testimonial.text}"</p>
                    </div>
                    
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                        <p className="text-sm opacity-70">{testimonial.role}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced Career Guides */}
      <section className={`py-24 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="text-center mb-16">
              <motion.div variants={fadeInUp} className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-medium mb-8">
                <TrendingUp className="w-4 h-4 mr-2" />
                Career Growth Resources
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-5xl font-bold mb-6">
                Navigate Your Career Path
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl opacity-80 max-w-3xl mx-auto">
                Expert insights, industry trends, and comprehensive roadmaps to accelerate your professional growth
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogsData.slice(0, 3).map((blog, index) => (
                <motion.div
                  key={blog._id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className={`group ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-200/20`}
                  onClick={() => navigate(`/roadmap/${blog._id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={blog.thumbnail} 
                      alt={blog.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-purple-500 text-white text-xs font-semibold px-3 py-2 rounded-full">
                      {blog.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                      {blog.rating}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                      {blog.description || "Discover insights and strategies to advance your career in today's competitive landscape."}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{blog.createdBy}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          <span>{blog.likes?.length || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>{blog.comments?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200/20">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold group-hover:underline flex items-center">
                        Read Full Article
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="text-center mt-12">
              <button
                onClick={() => {
                  navigate('/discovercourses')
                  scrollTo(0,0)
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center transform hover:scale-105"
              >
                View All Career Guides
                <TrendingUp className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Community Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="text-center mb-16">
              <motion.div variants={fadeInUp} className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-teal-100 text-green-800 text-sm font-medium mb-8">
                <Users className="w-4 h-4 mr-2" />
                Learning Community
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-5xl font-bold mb-6">
                Connect & Collaborate
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl opacity-80 max-w-3xl mx-auto">
                Join a vibrant community of learners, share knowledge, get help, and celebrate achievements together
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {postsData.slice(0, 2).map((post, index) => (
                <motion.div
                  key={post._id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className={`group ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 border border-gray-200/20`}
                  onClick={() => {
                    navigate(`/singlepost/${post._id}`)
                    scrollTo(0,0)
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <img 
                      src={post.user?.picture || '/api/placeholder/48/48'} 
                      alt={post.user?.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{post.user?.name}</h4>
                          <p className="text-sm opacity-70">
                            {new Date(post.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          post.tags === 'Question' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          post.tags === 'Project' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          post.tags === 'Discussion' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {post.tags}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200/20">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            <span>{post.likes?.length || 0}</span>
                          </div>
                          <div className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            <span>{post.comments?.length || 0}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>{post.views || Math.floor(Math.random() * 100) + 50}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="text-center">
              <button
                onClick={() => {
                  navigate('/community')
                  scrollTo(0,0)
                }}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 inline-flex items-center transform hover:scale-105 hover:shadow-2xl"
              >
                Join the Community
                <MessageCircle className="w-6 h-6 ml-3" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8">
              <Rocket className="w-4 h-4 mr-2" />
              {isVisitor ? 'Start Your Journey Today' : 'Continue Your Growth'}
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {isVisitor ? (
                <>Transform Your Career<br />In Just 30 Days</>
              ) : (
                <>Unlock New<br />Opportunities</>
              )}
            </h2>
            
            <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              {isVisitor 
                ? 'Join over 5 professionals who have successfully advanced their careers through our proven learning platform'
                : 'Explore cutting-edge courses and expand your expertise in the latest technologies and methodologies'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => {
                  navigate(isVisitor ? '/signup' : '/discovercourses')
                  scrollTo(0,0)
                }}
                className="group bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-2xl"
              >
                {isVisitor ? 'Start Learning Free' : 'Explore New Courses'}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
              {isVisitor && (
                <button
                  onClick={() => {
                    navigate('/login') ; scrollTo(0,0)
                  }}
                  className="group border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center"
                >
                  Already have an account?
                  <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

            {/* Trust indicators */}
        
          </motion.div>
        </div>
      </section>

      {/* Enhanced Floating Action Button for Mobile */}
      {isVisitor && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          className="fixed bottom-6 right-6 z-50 lg:hidden"
        >
          <button
            onClick={() => {
              navigate('/signup')
              scrollTo(0,0)
            }}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-3xl"
          >
            <Rocket className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          </button>
          <div className="absolute -top-12 -left-8 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Start Learning
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default HomePage