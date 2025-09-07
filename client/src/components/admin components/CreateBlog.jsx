import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/admin components/AdminNavbar'
import useAppContext from '../../context/AppContext'
import { Home, BadgePlus, Menu, X, Edit, Upload, User, FileText, Tag, Image, Loader2 } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateBlog = () => {
  const { theme } = useAppContext()
  const [activeItem, setActiveItem] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [createdBy, setCreatedBy] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [loading, setLoading] = useState(false)

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

  const categoryOptions = [
    'Web Development',
    'Mobile Development',
    'Data & AI',
    'Design & Creative',
    'Cybersecurity & DevOps',
    'Others'
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
    setIsSidebarOpen(false)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const isActive = (itemId) => activeItem === itemId

  // Handle thumbnail upload and preview
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setThumbnail(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Form validation
  const validateForm = () => {
    if (!title.trim()) {
      toast.error('Please enter a blog title')
      return false
    }
    if (!content.trim()) {
      toast.error('Please enter blog content')
      return false
    }
    if (!createdBy.trim()) {
      toast.error('Please enter creator name')
      return false
    }
    if (!category) {
      toast.error('Please select a category')
      return false
    }
    if (!thumbnail) {
      toast.error('Please select a thumbnail image')
      return false
    }
    return true
  }

  // API call to add new blog
  const addNewBlog = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("title", title)
      formData.append("category", category)
      formData.append("thumbnail", thumbnail)
      formData.append("content", content)
      formData.append("createdBy", createdBy)

      const { data } = await axios.post('/api/blog/createblog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      if (!data.success) {
        return toast.error(data.message)
      } else {
        toast.success(data.message)
        // Reset form
        setTitle("")
        setContent("")
        setCreatedBy("")
        setCategory("")
        setThumbnail(null)
        setThumbnailPreview(null)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

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
                        : 'bg-blue-100 text-blue-700'
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
        <div className='flex-1 p-4 lg:p-8 overflow-auto'>
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Create New Blog
              </h1>
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Share your knowledge with the community
              </p>
            </div>

            {/* Blog Form */}
            <div className={`rounded-2xl shadow-xl border p-6 lg:p-8 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <form onSubmit={addNewBlog} className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className={`flex items-center space-x-2 text-sm font-semibold mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FileText className="w-4 h-4" />
                    <span>Blog Title</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter an engaging title for your blog..."
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    required
                  />
                </div>

                {/* Creator Input */}
                <div>
                  <label className={`flex items-center space-x-2 text-sm font-semibold mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <User className="w-4 h-4" />
                    <span>Author Name</span>
                  </label>
                  <input
                    type="text"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    placeholder="Enter the author's name..."
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    required
                  />
                </div>

                {/* Category Select */}
                <div>
                  <label className={`flex items-center space-x-2 text-sm font-semibold mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Tag className="w-4 h-4" />
                    <span>Category</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                    required
                  >
                    <option value="">Select a category</option>
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Content Textarea */}
                <div>
                  <label className={`flex items-center space-x-2 text-sm font-semibold mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Edit className="w-4 h-4" />
                    <span>Blog Content</span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog content here..."
                    rows={8}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    required
                  />
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className={`flex items-center space-x-2 text-sm font-semibold mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Image className="w-4 h-4" />
                    <span>Thumbnail Image</span>
                  </label>
                  
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4'
                          : 'bg-gray-50 border-gray-300 text-gray-900 file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4'
                      }`}
                      required
                    />
                    
                    {/* Image Preview */}
                    {thumbnailPreview && (
                      <div className="mt-4">
                        <p className={`text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Preview:
                        </p>
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full max-w-md h-48 object-cover rounded-xl border-2 border-dashed border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating Blog...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span>Publish Blog</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog