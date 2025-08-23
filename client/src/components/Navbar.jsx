import React, { useState } from 'react'
import { useNavigate, useLocation , Link} from 'react-router-dom'
import { Search, ChevronDown, User, BookOpen, Settings, LogOut, Menu, X , BookmarkPlus, MessageCircleQuestionMark} from 'lucide-react'
import nav_logo from '../assets/navbar_logo.png'
import useAppContext from '../context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'


const Navbar = () => {
  const { theme, loggedIn } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (['/login', '/signup'].includes(location.pathname)) return null;
  if (location.pathname.startsWith('/seller')) return null;
  if(location.pathname.startsWith('/admin')) return null
  if(location.pathname == '/') return null;

  const logoutUser = async () => {
    try {
      const {data} = await axios.get('/api/user/logoutuser')
      if(!data){
        return toast.error(data.message)
      }

      toast.success(data.message)
      window.location.pathname = ('/home')
      
    } catch (error) {
      toast.error(error.message)
    }
  }


  const linkBase =
    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
  const linkHover =
    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'

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
            onClick={() => navigate('/')}
          >
            <img
              src={nav_logo}
              alt="Sensei Logo"
              className="h-30 w-auto hover:opacity-80 transition-opacity"
            />
          </div>

          {/* Search (desktop) */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for courses"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Links (desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              className={`${linkBase} ${linkHover}`}
              onClick={() => navigate('/home')}
            >
              Home
            </button>
            <button
              className={`${linkBase} ${linkHover}`}
              onClick={() => navigate('/community')}
            >
              Discover Courses
            </button>
            <button
              className={`${linkBase} ${linkHover}`}
              onClick={() => navigate('/community')}
            >
              Carrers & Roadmaps
            </button>
            <button
              className={`${linkBase} ${linkHover}`}
              onClick={() => navigate('/admin')}
            >
              Admin 
            </button>
            <button
              className={`${linkBase} ${linkHover}`}
              onClick={() => navigate('/seller')}
            >
              Teach on Sensei
            </button>
            <button
              className={`${linkBase} ${linkHover}`}
              onClick={() => navigate('/community')}
            >
              Community
            </button>
          </div>

          {/* Auth section */}
          <div className="flex items-center space-x-4">
            {loggedIn ? (
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
                      <a
                        href="userprofile"
                        className={`flex items-center space-x-2 px-4 py-2 text-sm ${linkHover}`}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </a>
                      <a
                        href="#"
                        className={`flex items-center space-x-2 px-4 py-2 text-sm ${linkHover}`}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>My Courses</span>
                      </a>
                      <a
                        href="#"
                        className={`flex items-center space-x-2 px-4 py-2 text-sm ${linkHover}`}
                      >
                        <BookmarkPlus className="w-4 h-4" />
                        <span>Wishlist</span>
                      </a>
                      <a
                        href="#"
                        className={`flex items-center space-x-2 px-4 py-2 text-sm ${linkHover}`}
                      >
                        <MessageCircleQuestionMark className="w-4 h-4" />
                        <span>Support</span>
                      </a>
                      <a
                        href="#"
                        className={`flex items-center space-x-2 px-4 py-2 text-sm ${linkHover}`}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </a>
                      <hr
                        className={`my-1 ${
                          theme === 'dark'
                            ? 'border-gray-700'
                            : 'border-gray-200'
                        }`}
                      />
                      <a
                        onClick={logoutUser}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm ${linkHover} text-red-600 cursor-pointer `}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/login')}
                  className={`${linkBase} ${linkHover}`}
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('/signup')}
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

        {/* Search (mobile) */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for courses"
              className={`w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                className={`${linkBase} ${linkHover} block w-full text-left`}
                onClick={() => {
                  navigate('/home')
                  setIsMobileMenuOpen(false)
                }}
              >
                Home
              </button>
              <button
                className={`${linkBase} ${linkHover} block w-full text-left`}
                onClick={() => {
                  navigate('/seller')
                  setIsMobileMenuOpen(false)
                }}
              >
                Teach on Sensei
              </button>
              <button
                className={`${linkBase} ${linkHover} block w-full text-left`}
                onClick={() => {
                  navigate('/community')
                  setIsMobileMenuOpen(false)
                }}
              >
                Community
              </button>

              {!loggedIn && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <button
                    onClick={() => {
                      navigate('/login')
                      setIsMobileMenuOpen(false)
                    }}
                    className={`${linkBase} ${linkHover} block w-full text-left`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      navigate('/signup')
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

export default Navbar
