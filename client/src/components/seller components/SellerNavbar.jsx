import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import useAppContext from '../../context/AppContext'
import toast from 'react-hot-toast'
import nav_logo from '../../assets/navbar_logo.png'
import {motion} from 'framer-motion'

const SellerNavbar = () => {
  const { theme, sellerLoggedIn } = useAppContext()
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const linkBase =
    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
  const linkHover =
    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'

  const handleLogout = () => {
    // Add your logout logic here
    toast.success('Logged out successfully')
    navigate('/seller/login')
  }

  return (
    <motion.nav
      className={`sticky top-0 z-50 border-b shadow-sm transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-gray-800 text-gray-200 border-gray-700'
          : 'bg-white text-slate-800 border-gray-200'
      }`}
    >
      <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate('/home')}
          >
            <img
              src={nav_logo}
              alt="Sensei Logo"
              className="h-30 w-auto hover:opacity-80 transition-opacity"
            />
          </div>

          {/* Welcome Message (desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className={`text-lg font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
            }`}>
              Welcome to Seller Dashboard
            </div>
          </div>

          {/* Navigation Links (desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              className={`${linkBase} ${linkHover} flex items-center space-x-2`}
              onClick={() => navigate('/seller')}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Welcome Message (mobile) */}
        <div className="md:hidden pb-4">
          <div className={`text-center text-lg font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
          }`}>
            Welcome to Seller Dashboard
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden border-t ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                className={`${linkBase} ${linkHover} flex items-center space-x-2 w-full text-left`}
                onClick={() => {
                  navigate('/')
                  setIsMobileMenuOpen(false)
                }}
              >
                <LogOut className="w-4 h-4" />
                <span>Home</span>
              </button>

              {!sellerLoggedIn && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <button
                    onClick={() => {
                      navigate('/seller/login')
                      setIsMobileMenuOpen(false)
                    }}
                    className={`${linkBase} ${linkHover} block w-full text-left`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      navigate('/seller/signup')
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  )
}

export default SellerNavbar