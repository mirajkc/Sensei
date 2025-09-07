import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/admin components/AdminNavbar'
import useAppContext from '../../context/AppContext'
import { Home, BadgePlus, Menu, X, Edit, Trash2, Eye } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const EditBlog = () => {
  const { theme } = useAppContext()
  const [activeItem, setActiveItem] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [blogs, setBlogs] = useState([])

  const getAllCourse = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/blog/getallblog')
      if (!data.success) {
        return toast.error(data.message)
      }
      setBlogs(data.blogs)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getAllCourse() }, [])

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

  const handleEdit = (blogId) => {
    // Navigate to edit blog page or open edit modal
    navigate(`/admin/editblog/${blogId}`)
  }

  const handleDelete = async (blogId, blogTitle) => {
    if (window.confirm(`Are you sure you want to delete "${blogTitle}"?`)) {
      try {
        setDeleteLoading(blogId)
        const { data } = await axios.delete(`/api/blog/deleteblog/${blogId}`)
        if (data.success) {
          toast.success('Blog deleted successfully')
          // Remove the deleted blog from state
          setBlogs(blogs.filter(blog => blog._id !== blogId))
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error('Failed to delete blog')
      } finally {
        setDeleteLoading(null)
      }
    }
  }

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <AdminNavbar />

      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 border-b border-gray-200">
        <button
          onClick={toggleSidebar}
          className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${theme === 'dark'
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
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                Admin Panel
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Header */}
            <h2 className={`hidden md:block text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
              Admin Panel
            </h2>

            <nav className='space-y-1'>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${isActive(item.id)
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
            <div className={`mt-8 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
              <p className={`text-xs text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                Admin Dashboard v1.0
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='flex-1 p-4 md:p-6 overflow-auto'>
          <div className={`max-w-7xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
            
            {/* Page Header */}
            <div className="mb-6">
              <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                Manage Blogs
              </h1>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                Edit or delete your blog posts
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme === 'dark' ? 'border-white' : 'border-gray-900'
                  }`}></div>
              </div>
            ) : (
              <>
                {/* Blog Stats */}
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } rounded-lg shadow p-4 mb-6`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    Total Blogs: <span className="font-semibold">{blogs.length}</span>
                  </p>
                </div>

                {/* Blogs Table */}
                {blogs.length === 0 ? (
                  <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } rounded-lg shadow p-8 text-center`}>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      No blogs found. Create your first blog post!
                    </p>
                  </div>
                ) : (
                  <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } rounded-lg shadow overflow-hidden`}>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                          }`}>
                          <tr>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                              }`}>
                              Blog Details
                            </th>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                              }`}>
                              Category
                            </th>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                              }`}>
                              Created
                            </th>
                            <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                              }`}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                          } divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
                          }`}>
                          {blogs.map((blog) => (
                            <tr key={blog._id} className={`hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                              } transition-colors`}>
                              <td className="px-6 py-4">
                                <div className="flex items-start space-x-4">
                                  <img
                                    src={blog.thumbnail}
                                    alt={blog.title}
                                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                      } line-clamp-2`}>
                                      {blog.title}
                                    </p>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                      } mt-1 line-clamp-3`}>
                                      {truncateText(blog.content)}
                                    </p>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                      } mt-1`}>
                                      {blog.createdBy}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${theme === 'dark'
                                  ? 'bg-blue-800 text-blue-200'
                                  : 'bg-blue-100 text-blue-800'
                                  }`}>
                                  {blog.category}
                                </span>
                              </td>
                              <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                {formatDate(blog.createdAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="flex justify-center space-x-2">
                                  <button
                                    onClick={() => handleEdit(blog._id)}
                                    className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                      ? 'text-blue-400 hover:bg-blue-800/20 hover:text-blue-300'
                                      : 'text-blue-600 hover:bg-blue-100 hover:text-blue-700'
                                      }`}
                                    title="Edit Blog"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(blog._id, blog.title)}
                                    disabled={deleteLoading === blog._id}
                                    className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                      ? 'text-red-400 hover:bg-red-800/20 hover:text-red-300'
                                      : 'text-red-600 hover:bg-red-100 hover:text-red-700'
                                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    title="Delete Blog"
                                  >
                                    {deleteLoading === blog._id ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                    ) : (
                                      <Trash2 className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden">
                      {blogs.map((blog) => (
                        <div key={blog._id} className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                          } last:border-b-0`}>
                          <div className="flex items-start space-x-3">
                            <img
                              src={blog.thumbnail}
                              alt={blog.title}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                } line-clamp-2 mb-1`}>
                                {blog.title}
                              </h3>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                } mb-2 line-clamp-2`}>
                                {truncateText(blog.content, 80)}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${theme === 'dark'
                                    ? 'bg-blue-800 text-blue-200'
                                    : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {blog.category}
                                  </span>
                                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    {formatDate(blog.createdAt)}
                                  </span>
                                </div>
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => handleEdit(blog._id)}
                                    className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                      ? 'text-blue-400 hover:bg-blue-800/20'
                                      : 'text-blue-600 hover:bg-blue-100'
                                      }`}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(blog._id, blog.title)}
                                    disabled={deleteLoading === blog._id}
                                    className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                      ? 'text-red-400 hover:bg-red-800/20'
                                      : 'text-red-600 hover:bg-red-100'
                                      } disabled:opacity-50`}
                                  >
                                    {deleteLoading === blog._id ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                    ) : (
                                      <Trash2 className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBlog