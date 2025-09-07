import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/admin components/AdminNavbar'
import useAppContext from '../../context/AppContext'
import { Home, BadgePlus, Menu, X, Edit } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const AdminHome = () => {
  const { theme } = useAppContext()
  const [activeItem, setActiveItem] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/admin'
    },
    {
      id: 'addnewblog',
      label: 'Add New Blog',
      icon: BadgePlus,
      href: '/admin/addblog'
    },
    {
      id: 'editblogs',
      label: 'Edit Blogs',
      icon: Edit,
      href: '/admin/editblogs'
    },
  ]

  // Set active item based on current route
  useEffect(() => {
    const currentItem = menuItems.find(item => item.href === location.pathname)
    if (currentItem) {
      setActiveItem(currentItem.id)
    }
  }, [location.pathname])

  const handleNavigation = (item) => {
    setActiveItem(item.id)
    navigate(item.href)
    setIsSidebarOpen(false) // Close sidebar on mobile after navigation
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const isActive = (itemId) => activeItem === itemId

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <AdminNavbar />
      
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 border-b border-gray-200">
        <button
          onClick={toggleSidebar}
          className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 shadow-sm'
          }`}
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="font-medium">Menu</span>
        </button>
      </div>

      <div className='flex h-screen relative'>
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-0"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static
          fixed top-0 left-0 z-50
          w-64 md:w-80 lg:w-1/6 h-full
          border-r transition-all duration-300 ease-in-out
          ${theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
          } 
          overflow-y-auto shadow-lg md:shadow-none
        `}>
          <div className='p-4'>
            {/* Mobile Header with Close Button */}
            <div className="md:hidden flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Admin Panel
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Header */}
            <h2 className={`hidden md:block text-xl font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Admin Panel
            </h2>
            
            <nav className='space-y-1'>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive(item.id)
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'
                  }`}
                >
                  <item.icon className='w-5 h-5 flex-shrink-0' />
                  <span className='font-medium text-sm md:text-base'>{item.label}</span>
                </button>
              ))}
            </nav>
            {/* Footer info for sidebar */}
            <div className={`mt-8 pt-4 border-t ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <p className={`text-xs text-center ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Admin Dashboard v1.0
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='flex-1 p-4 md:p-6 overflow-auto'>
          <div className={`max-w-7xl mx-auto ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            <div className="mb-6">
              <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mb-2'>
                {menuItems.find(item => item.id === activeItem)?.label || 'Dashboard'}
              </h1>
              <p className='text-sm md:text-base text-gray-500'>
                Welcome to Admin Dashboard
              </p>
            </div>
            
            {/* Content Card */}
            <div className={`rounded-lg shadow-sm border p-6 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <p className='text-gray-500 text-sm md:text-base'>
                Content for {activeItem} will go here...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome