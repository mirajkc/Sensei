import React, { useState } from 'react'
import { useNavigate, useLocation , Link} from 'react-router-dom'
import { Search, ChevronDown, User, BookOpen, LogOut, Menu, X , BookmarkPlus, MessageCircleQuestionMark, ShoppingCart} from 'lucide-react'
import nav_logo from '../assets/navbar_logo.png'
import useAppContext from '../context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const { theme, loggedIn, userDetails  ,  cartItemsDetails} = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchValue , setSearchValue] = useState("")
  
  const cartItemsCount = cartItemsDetails.totalCartItems
  
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

  const handleSearch = (e) => {
  if (e.key === 'Enter' && searchValue.trim()) {
    navigate(`/search?query=${searchValue.trim()}`);
    scrollTo(0,0)
    setSearchValue('');
  }
};


  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative overflow-hidden'
  const linkHover = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
  }

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const staggerItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  const searchVariants = {
    initial: { scale: 1 },
    focus: { 
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  }


  return (
    <div className={`${theme === "dark" ? 'bg-gray-800' : 'bg-white'}`}>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`sticky top-0 z-50 border-b shadow-sm transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-gray-800 text-gray-200 border-gray-700'
            : 'bg-white text-slate-800 border-gray-200'
        }`}
      >
        <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="flex-shrink-0 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img
                src={nav_logo}
                alt="Sensei Logo"
                className="h-30 w-auto transition-opacity duration-300"
              />
            </motion.div>

            {/* Search (desktop) */}
            <motion.div 
              className="hidden md:block flex-1 max-w-md mx-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="relative">
                <motion.input
                  variants={searchVariants}
                  initial="initial"
                  whileFocus="focus"
                  type="text"
                  placeholder="Search for courses"
                  value={searchValue}
                   onKeyDown={handleSearch}
                  onChange={(e)=>setSearchValue(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <motion.div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Links (desktop) */}
            <motion.div 
              className="hidden lg:flex items-center space-x-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                { label: 'Home', path: '/home' },
                { label: 'Discover Courses', path: '/discovercourses' },
                { label: 'Careers & Roadmaps', path: '/career&roadmaps' },
                { label: 'Teach on Sensei', path: '/seller' },
                { label: 'Community', path: '/community' }
              ].map((item, index) => (
                <motion.button
                  key={item.label}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${linkBase} ${linkHover} group`}
                  onClick={() => navigate(item.path)}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.div
                    className="absolute inset-0 bg-blue-500 opacity-0 rounded-md"
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </motion.div>

            {/* Auth section */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Shopping Cart - Always visible */}
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => navigate('/cart')}
                className={`relative p-2 rounded-full transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'hover:bg-gray-700 text-gray-200'
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                
                {/* Cart Badge */}
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  >
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </motion.span>
                )}
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-blue-500 opacity-0 rounded-full blur-md"
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
              {loggedIn ? (
                <div className="relative">
                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center space-x-2 p-2 rounded-full transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <motion.img 
                      src={userDetails.picture} 
                      className='rounded-full w-10 h-10'
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      animate={{ rotate: isProfileOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 ${
                          theme === 'dark'
                            ? 'bg-gray-800 border border-gray-700'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="py-1">
                          {[
                            { icon: User, label: 'Profile', href: '/userprofile' },
                            { icon: BookOpen, label: 'My Courses', href: '/enrolledcourses' },
                            { icon: ShoppingCart, label: 'My Cart', href: '/cart' },
                            { icon: BookmarkPlus, label: 'My Wishlist', href: '/wishlists' },
                            { icon: MessageCircleQuestionMark, label: 'Support', href: '/#' }
                          ].map((item, index) => (
                            <motion.a
                              key={item.label}
                              href={item.href}
                              className={`flex items-center space-x-2 px-4 py-2 text-sm ${linkHover}`}
                              whileHover={{ x: 4, backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}
                              transition={{ duration: 0.2 }}
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </motion.a>
                          ))}
                          
                          <hr className={`my-1 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                          
                          <motion.a
                            onClick={logoutUser}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm ${linkHover} text-red-600 cursor-pointer`}
                            whileHover={{ x: 4, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                            transition={{ duration: 0.2 }}
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </motion.a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => navigate('/login')}
                    className={`${linkBase} ${linkHover}`}
                  >
                    Log In
                  </motion.button>
                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </div>
              )}

              {/* Mobile toggle */}
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Search (mobile) */}
          <motion.div 
            className="lg:hidden pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className="relative">
              <motion.input
                variants={searchVariants}
                initial="initial"
                whileFocus="focus"
                type="text"
                placeholder="Search for courses"
                className={`w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </motion.div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`lg:hidden border-t overflow-hidden ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <motion.div 
                  className="px-2 pt-2 pb-3 space-y-1"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { label: 'Home', path: '/home' },
                    { label: 'Discover Courses', path: '/discovercourses' },
                    { label: 'Careers & Roadmaps', path: '/career&roadmaps' },
                    { label: 'Teach on Sensei', path: '/seller' },
                    { label: 'Community', path: '/community' }
                  ].map((item, index) => (
                    <motion.button
                      key={item.label}
                      variants={staggerItem}
                      whileHover={{ x: 8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`${linkBase} ${linkHover} block w-full text-left`}
                      onClick={() => {
                        navigate(item.path)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      {item.label}
                    </motion.button>
                  ))}

                  {!loggedIn && (
                    <motion.div 
                      className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2"
                      variants={staggerItem}
                    >
                      <motion.button
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          navigate('/login')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`${linkBase} ${linkHover} block w-full text-left`}
                      >
                        Log In
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          navigate('/signup')
                          setIsMobileMenuOpen(false)
                        }}
                        className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10">Sign Up</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  )
}

export default Navbar