import React from 'react'
import  useAppContext  from '../context/AppContext.jsx'
import { motion, scale } from 'framer-motion'
import { Home, Info, MapPin, BookOpen } from 'lucide-react'
import nav_logo from '../assets/navbar_logo.png'
import  { useLocation } from 'react-router-dom'

const Footer = () => {
  const { theme } = useAppContext()
  const location = useLocation()
  if (['/login', '/signup'].includes(location.pathname)) return null;
  if (location.pathname.startsWith('/seller')) return null;
  if(location.pathname.startsWith('/admin')) return null



  return (
    <div className={`${ theme === "dark" ? 'bg-gray-800' : 'bg-white' }`} >
          <motion.footer
      initial={{opacity : 0 , y:100}}
      whileInView={{opacity : 1 , y : 0}}
      transition={ {duration : 0.8}}
      className={`w-full py-6 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } flex flex-col items-center justify-center`}
    >
      <motion.div 
      whileHover={{ scale: 1.1 }}
      className='max-w-50' >
        <img className='w-max h-max' src={nav_logo} alt="" />
      </motion.div>
      {/* Icon navigation */}
      <div className="flex gap-8 mb-4">
        <a  href="/" className="hover:text-blue-500 scale-1.1 transition-colors">
          <Home size={24} />
        </a>
        <a href="/about" className="hover:text-blue-500 transition-colors">
          <Info size={24} />
        </a>
        <a href="/maps" className="hover:text-blue-500 transition-colors">
          <MapPin size={24} />
        </a>
        <a href="/courses" className="hover:text-blue-500 transition-colors">
          <BookOpen size={24} />
        </a>
      </div>

      {/* Copyright */}
      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        © 2024 PrebuiltUI. All rights reserved.
      </p>
    </motion.footer>
    </div>

  )
}

export default Footer
