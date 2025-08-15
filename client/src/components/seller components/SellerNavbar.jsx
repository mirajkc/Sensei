import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, User, BookOpen, Settings, LogOut, Menu, X, Home } from 'lucide-react'
import useAppContext from '../../context/AppContext'
import toast from 'react-hot-toast'
import nav_logo from '../../assets/navbar_logo.png'

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
    <nav
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
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
          </div>

          {/* Auth section */}
          <div className="flex items-center space-x-4">
            {sellerLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-full transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isProfileOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 ${
                      theme === 'dark'
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate('/seller/profile')
                          setIsProfileOpen(false)
                        }}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm w-full text-left ${linkHover}`}
                      >
                        <User className="w-4 h-4" />
                        <span>Seller Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/seller/courses')
                          setIsProfileOpen(false)
                        }}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm w-full text-left ${linkHover}`}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>My Courses</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/seller/settings')
                          setIsProfileOpen(false)
                        }}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm w-full text-left ${linkHover}`}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <hr
                        className={`my-1 ${
                          theme === 'dark'
                            ? 'border-gray-700'
                            : 'border-gray-200'
                        }`}
                      />
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsProfileOpen(false)
                        }}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm w-full text-left ${linkHover} text-red-600`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/seller/login')}
                  className={`${linkBase} ${linkHover}`}
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('/seller/signup')}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
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
                <Home className="w-4 h-4" />
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
    </nav>
  )
}

export default SellerNavbar