import React from 'react'
import useAppContext from '../context/AppContext.jsx'
import { motion } from 'framer-motion'
import { Home, Info, MapPin, BookOpen } from 'lucide-react'
import nav_logo from '../assets/navbar_logo.png'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const { theme } = useAppContext()
  const location = useLocation()
  
  if (['/login', '/signup'].includes(location.pathname)) return null;
  if (location.pathname.startsWith('/seller')) return null;
  if(location.pathname.startsWith('/admin')) return null

  // Animation variants
  const footerVariants = {
    hidden: { 
      opacity: 0, 
      y: 100 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  }

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    },
    tap: { scale: 0.95 }
  }

  const iconContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const iconVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.8 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.2,
      y: -5,
      rotate: 10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.9 }
  }

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  }

  const iconItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: Info, label: "About" },
    { href: "/career&roadmaps", icon: MapPin, label: "Maps" },
    { href: "/discovercourses", icon: BookOpen, label: "Courses" }
  ]

  return (
    <div className={`${theme === "dark" ? 'bg-gray-800' : 'bg-white'}`}>
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`w-full py-8 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } flex flex-col items-center justify-center relative overflow-hidden`}
      >
        {/* Animated background effect */}
        <motion.div
          className="absolute inset-0 opacity-5"
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          viewport={{ once: true }}
        >
          <div className={`w-full h-full ${
            theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-indigo-500'
          } rounded-full blur-3xl transform scale-150`} />
        </motion.div>

        {/* Logo */}
        <motion.div
          variants={logoVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className='max-w-50 mb-6 relative z-10 cursor-pointer'
        >
          <motion.img 
            className='w-max h-max' 
            src={nav_logo} 
            alt="Logo"
            initial={{ filter: "brightness(1)" }}
            whileHover={{ filter: "brightness(1.2)" }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-0"
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Icon navigation */}
        <motion.div 
          className="flex gap-8 mb-6 relative z-10"
          variants={iconContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {iconItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.a
                key={item.label}
                href={item.href}
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className={`relative group ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                } transition-colors duration-300`}
              >
                {/* Icon background glow */}
                <motion.div
                  className="absolute inset-0 bg-blue-500 rounded-full opacity-0 blur-md"
                  whileHover={{ opacity: 0.3, scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon */}
                <motion.div className="relative z-10">
                  <IconComponent size={24} />
                </motion.div>

                {/* Hover underline effect */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-blue-500"
                  whileHover={{ 
                    width: "100%", 
                    x: "-50%"
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Tooltip */}
                <motion.div
                  className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs opacity-0 pointer-events-none ${
                    theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
                  }`}
                  whileHover={{ opacity: 1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800" />
                </motion.div>

                {/* Ripple effect on click */}
                <motion.div
                  className="absolute inset-0 bg-blue-400 rounded-full opacity-0"
                  whileTap={{ 
                    scale: [1, 1.5], 
                    opacity: [0.3, 0] 
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
            )
          })}
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className={`w-24 h-px mb-4 ${
            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
          }`}
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 96, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        />

        {/* Copyright with typing effect */}
        <motion.div
          variants={textVariants}
          className="relative z-10"
        >
          <motion.p 
            className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            © 2025 Sensei. All rights reserved.
          </motion.p>
        </motion.div>

        {/* Floating particles effect */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute w-2 h-2 ${
              theme === 'dark' ? 'bg-blue-400' : 'bg-blue-300'
            } rounded-full opacity-20`}
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 100 + 50,
              scale: 0
            }}
            whileInView={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 100 - 50,
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
            viewport={{ once: true }}
          />
        ))}
      </motion.footer>
    </div>
  )
}

export default Footer