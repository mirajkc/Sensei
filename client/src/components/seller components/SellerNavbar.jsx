import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Menu, X } from 'lucide-react'
import useAppContext from '../../context/AppContext'
import toast from 'react-hot-toast'
import nav_logo from '../../assets/navbar_logo.png'
import { motion } from 'framer-motion'

const SellerNavbar = () => {
  const { theme, sellerLoggedIn } = useAppContext()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const linkBase =
    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
  const linkHover =
    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'

  const handleLogout = () => {
    toast.success('Logged out successfully')
    navigate('/seller/login')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <motion.nav
      className={`sticky top-0 z-50 border-b shadow-sm transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-gray-800 text-gray-200 border-gray-700'
          : 'bg-white text-slate-800 border-gray-200'
      }`}
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate('/seller')}
          >
            <img
              src={nav_logo}
              alt="Sensei Logo"
              className="h-30 w-auto hover:opacity-80 transition-opacity"
            />
          </div>

          {/* Welcome Message (desktop only) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className={`text-lg font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
            }`}>
              Welcome to Seller Dashboard
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className={`${linkBase} ${linkHover} flex items-center space-x-2`}
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${
                theme === 'dark' 
                  ? 'text-gray-200 hover:bg-gray-700' 
                  : 'text-slate-800 hover:bg-gray-100'
              } transition-colors duration-200`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden"
        >
          <div className={`border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            {/* Welcome Message (mobile) */}
            <div className="px-4 py-3">
              <div className={`text-center text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
              }`}>
                Welcome to Seller Dashboard
              </div>
            </div>
            
            {/* Mobile Navigation Links */}
            <div className="px-2 pb-3 space-y-1">
              <button
                className={`${linkBase} ${linkHover} flex items-center space-x-2 w-full text-left`}
                onClick={() => {
                  handleLogout()
                  setIsMobileMenuOpen(false)
                }}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default SellerNavbar