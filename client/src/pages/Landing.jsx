import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import  useAppContext  from '../context/AppContext.jsx'
import { 
  BookOpen, Users, Target, TrendingUp, Shield, Globe, 
  GraduationCap, ArrowRight, Play, CheckCircle, Award, Zap, Star 
} from "lucide-react"

const Landing = () => {
  const { theme } = useAppContext()
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  }

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Interactive Learning",
      description: "Engage with dynamic content and interactive lessons designed for modern learners."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Environment", 
      description: "Connect with peers and instructors in a supportive learning community."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Carrer Guide",
      description: "Shape your future with Sensei’s career-focused learning paths."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your advancement with detailed analytics and progress reports."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Enterprise-grade security ensuring your data and progress are protected."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Access",
      description: "Learn from anywhere with our cloud-based platform and mobile support."
    }
  ]

  const courses = [
    {
      title: "Web Development Fundamentals",
      instructor: "Sarah Chen", 
      rating: 4.9,
      students: 2847,
      duration: "8 weeks"
    },
    {
      title: "Data Science & Analytics",
      instructor: "Dr. Michael Rodriguez",
      rating: 4.8,
      students: 1923,
      duration: "12 weeks"
    },
    {
      title: "Digital Marketing Mastery",
      instructor: "Emma Thompson",
      rating: 4.9,
      students: 3201,
      duration: "6 weeks"
    }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Translucent Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 w-full z-50 backdrop-blur-md ${
          theme === 'dark' ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/home')}
            >
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold">Sensei</span>
            </motion.div>
            
            <div className="flex items-center space-x-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/home')}
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/discovercourses')}
                className="hover:text-blue-600 transition-colors"
              >
                Explore Courses
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/career&roadmaps')}
                className="hover:text-blue-600 transition-colors"
              >
                Career
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid xl:grid-cols-2 gap-12 xl:gap-16 items-center">
            <motion.div variants={itemVariants} className="space-y-6 xl:space-y-8">
              <div className="space-y-4 xl:space-y-6">
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-5xl xl:text-7xl font-bold leading-tight"
                >
                  Start Learning{' '}
                  <motion.span 
                    className="text-blue-600"
                    animate={{ 
                      background: ['linear-gradient(45deg, #3B82F6, #8B5CF6)', 'linear-gradient(45deg, #8B5CF6, #3B82F6)'],
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text'
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    Courses
                  </motion.span>
                  <br />
                  from Sensei.
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className={`text-lg xl:text-xl leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Transform your career with our comprehensive learning platform. 
                  Access world-class courses, expert instructors, and a supportive community and guides.
                </motion.p>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 xl:gap-6"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={()=>navigate('/home')}
                  className="bg-blue-600 text-white px-8 xl:px-10 py-4 xl:py-5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg xl:text-xl font-semibold"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 xl:w-6 xl:h-6" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={()=>navigate('/about')}
                  className={`px-8 xl:px-10 py-4 xl:py-5 rounded-lg border-2 transition-colors flex items-center justify-center space-x-2 text-lg xl:text-xl font-medium ${
                    theme === 'dark' 
                      ? 'border-gray-600 hover:border-white hover:bg-gray-800' 
                      : 'border-gray-300 hover:border-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-5 h-5 xl:w-6 xl:h-6" />
                  <span>About Us</span>
                </motion.button>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 xl:gap-8 pt-6 xl:pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-2xl xl:text-4xl font-bold text-blue-600"
                  >
                    5+
                  </motion.div>
                  <div className={`text-xs xl:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Students</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="text-2xl xl:text-4xl font-bold text-blue-600"
                  >
                    10+
                  </motion.div>
                  <div className={`text-xs xl:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Courses</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="text-2xl xl:text-4xl font-bold text-blue-600"
                  >
                    4.9
                  </motion.div>
                  <div className={`text-xs xl:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Rating</div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <motion.div 
                animate={{ 
                  rotate: [6, -6, 6],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl ${
                  theme === 'dark' ? 'opacity-80' : 'opacity-20'
                }`}
              />
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={`relative rounded-3xl p-6 xl:p-10 backdrop-blur-sm ${
                  theme === 'dark' ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/80 border border-gray-200'
                }`}
              >
                <div className="space-y-4 xl:space-y-6">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex items-center space-x-3 xl:space-x-4"
                  >
                    <div className="w-10 h-10 xl:w-14 xl:h-14 bg-blue-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 xl:w-8 xl:h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base xl:text-lg">Complete Your Education With Sensei</h3>
                      <p className={`text-xs xl:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Join many of successful graduates
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2 xl:space-y-3"
                  >
                    {[
                      'Expert-led curriculum',
                      'Lifetime access to materials', 
                      'Industry-recognized certificates'
                    ].map((text, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center space-x-2 xl:space-x-3"
                      >
                        <CheckCircle className="w-4 h-4 xl:w-5 xl:h-5 text-green-500" />
                        <span className="text-xs xl:text-sm">{text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`py-20 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              We Success Learning Platform
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-blue-600">
              Creative Service
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-2xl cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:shadow-xl'
                }`}
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`rounded-3xl p-8 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}
            >
              <div className="space-y-6">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Complete About Students</h3>
                  <h4 className="text-xl text-blue-600 font-semibold">University Education.</h4>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: 'Course Completion Rate', value: 92, color: 'blue' },
                    { label: 'Student Satisfaction', value: 98, color: 'green' },
                    { label: 'Job Placement Rate', value: 85, color: 'purple' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span>{stat.label}</span>
                        <span className="font-semibold">{stat.value}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.value}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.3, duration: 1 }}
                          className={`h-full rounded-full ${
                            stat.color === 'blue' ? 'bg-blue-600' :
                            stat.color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={()=>navigate('/discovercourses')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enroll Now
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Empowering Students for Success
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className={`text-lg leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Our comprehensive learning platform has helped many of students 
                  achieve their educational and career goals. With cutting-edge technology 
                  and expert instruction, we provide the tools you need to succeed.
                </motion.p>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { icon: Zap, value: '24/7', label: 'Support Available', color: 'blue' },
                  { icon: Users, value: '10+', label: 'Expert Instructors', color: 'green' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    className={`text-center p-6 rounded-xl border-2 ${
                      item.color === 'blue' 
                        ? 'border-blue-200 dark:border-blue-800' 
                        : 'border-green-200 dark:border-green-800'
                    }`}
                  >
                    <item.icon className={`w-8 h-8 mx-auto mb-2 ${
                      item.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                    <div className={`text-2xl font-bold ${
                      item.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {item.value}
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>



      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready to Start Your Learning Journey?
          </motion.h2>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Join many of students who have transformed their careers with Sensei
          </motion.p>
          <motion.button 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{
              navigate('/home') ; scrollTo(0,0)
            }}
            className="bg-blue-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}

export default Landing
