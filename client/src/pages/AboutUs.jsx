import React from 'react'
import { motion } from 'framer-motion'
import useAppContext from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const AboutUs = () => {
  const navigate = useNavigate()
  const { theme } = useAppContext()

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

    const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  const skillsData = [
    { name: "React.js", level: "95%", icon: "⚛️" },
    { name: "Node.js", level: "90%", icon: "🟢" },
    { name: "Express.js", level: "88%", icon: "🚀" },
    { name: "MongoDB", level: "85%", icon: "🍃" },
    { name: "Tailwind CSS", level: "93%", icon: "🎨" },
    { name: "Framer Motion", level: "87%", icon: "✨" }
  ]

  const projectFeatures = [
    {
      title: "Course Management",
      description: "Complete course discovery, detailed views, cart system, and wishlist functionality",
      icon: "📚",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Learning Progress",
      description: "Automatic progress tracking with certificate generation upon completion",
      icon: "📈",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Multi-Dashboard System",
      description: "Separate dashboards for Admin, Seller, and Student with role-based access",
      icon: "🎛️",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Community Platform",
      description: "Interactive community posts with reply system and user engagement",
      icon: "👥",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Career Guidance",
      description: "Blog system for career roadmaps and professional development content",
      icon: "🎯",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "E-commerce Features",
      description: "Shopping cart, payment integration, and purchase management system",
      icon: "🛍️",
      color: "from-teal-500 to-cyan-500"
    }
  ]

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-24"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
            variants={containerVariants}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Miraj KC
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-medium mb-8 text-blue-600"
            variants={containerVariants}
          >
            Full-Stack Developer & LMS Creator
          </motion.p>

          <motion.p
            className={`text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-12 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
            variants={containerVariants}
          >
            Welcome to Sensei - a comprehensive Learning Management System that
            I've crafted from the ground up. This platform represents my passion
            for educational technology and showcases modern full-stack
            development with cutting-edge features.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={containerVariants}
          >
            <motion.a
              href="https://github.com/mirajkc"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg"
            >
              <span className="text-2xl mr-3">🔗</span>
              GitHub Profile
            </motion.a>

            <motion.a
              href="https://react-portfolio-tawny-mu.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <span className="text-2xl mr-3">🌐</span>
              View Portfolio
            </motion.a>
          </motion.div>
        </motion.section>

        {/* About the Project Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-24"
        >
          <div
            className={`rounded-3xl p-12 relative overflow-hidden ${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-800 to-gray-700"
                : "bg-gradient-to-br from-white to-gray-50 shadow-xl"
            }`}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              variants={containerVariants}
            >
              About <span className="text-blue-600">Sensei</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={containerVariants}>
                <h3 className="text-2xl font-bold mb-6 text-blue-600">
                  The Vision
                </h3>
                <p
                  className={`text-lg leading-relaxed mb-6 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Sensei is a modern Learning Management System that brings
                  students, instructors, and administrators together on a single
                  platform.
                </p>
                <p
                  className={`text-lg leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  With role-based dashboards, progress tracking, and secure
                  authentication, Sensei ensures an efficient and flexible
                  digital learning experience.
                </p>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 gap-4"
              >
                <div className={`p-6 rounded-2xl text-center ${
                  theme === "dark" ? "bg-gray-700" : "bg-blue-50"
                }`}>
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}>Core Features</div>
                </div>
                <div className={`p-6 rounded-2xl text-center ${
                  theme === "dark" ? "bg-gray-700" : "bg-green-50"
                }`}>
                  <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                  <div className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}>User Dashboards</div>
                </div>
                <div className={`p-6 rounded-2xl text-center ${
                  theme === "dark" ? "bg-gray-700" : "bg-purple-50"
                }`}>
                  <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                  <div className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}>Responsive</div>
                </div>
                <div className={`p-6 rounded-2xl text-center ${
                  theme === "dark" ? "bg-gray-700" : "bg-orange-50"
                }`}>
                  <div className="text-3xl font-bold text-orange-600 mb-2">6+</div>
                  <div className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}>Technologies</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Project Features */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-24"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={containerVariants}
          >
            Sensei <span className="text-blue-600">Features</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={containerVariants}
                whileHover="hover"
                className={`group relative rounded-2xl p-8 overflow-hidden ${
                  theme === "dark"
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white shadow-xl border border-gray-100"
                }`}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  variants={cardHoverVariants}
                />

                <div className="relative z-10">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p
                    className={`${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    } leading-relaxed`}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-24"
        >
          <div
            className={`rounded-3xl p-12 ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-gray-700"
                : "bg-gradient-to-r from-purple-50 to-blue-50 shadow-xl"
            }`}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              variants={containerVariants}
            >
              Technology <span className="text-blue-600">Stack</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={containerVariants}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-2xl ${
                    theme === "dark" ? "bg-gray-800/50" : "bg-white/80"
                  } backdrop-blur-sm border border-opacity-20`}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{skill.icon}</span>
                    <h3 className="text-lg font-bold">{skill.name}</h3>
                  </div>
                  <div
                    className={`w-full rounded-full h-3 ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    } overflow-hidden`}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </div>
                  <p
                    className={`text-sm mt-2 text-right font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {skill.level}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <div
            className={`rounded-3xl p-12 ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-gray-700"
                : "bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl"
            }`}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8"
              variants={containerVariants}
            >
              Ready to Explore <span className="text-blue-600">Sensei?</span>
            </motion.h2>

            <motion.p
              className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
              variants={containerVariants}
            >
              Experience the future of online learning with this comprehensive
              platform. Discover courses, track your progress, connect with the
              community, and earn certificates in your learning journey.
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate('/home')
                  scrollTo(0, 0)
                }}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Explore Platform
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open('https://github.com/mirajkc/Sensei', '_blank')
                }
                className={`px-10 py-4 text-lg font-semibold rounded-full border-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                } shadow-lg`}
              >
                View Source Code
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default AboutUs
