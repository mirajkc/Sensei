import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit3, Trash2, Eye, Clock, Users, DollarSign, Calendar, Search, Filter } from 'lucide-react'
import useAppContext from '../../context/AppContext'
import SellerNavbar from '../../components/seller components/SellerNavbar'
import SellerSidebar from '../../components/seller components/SellerSidebar'
import axios from 'axios'
import toast from 'react-hot-toast'

const SellerCoursesTable = () => {
  const { theme } = useAppContext()
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const categories = [
    'All',
    'Web Development',
    'Digital Marketing', 
    'Data Science',
    'Front End Development',
    'Back End Development',
    'Others'
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/course/getcoursebysellerid') 
      
      if (data.success) {
        setCourses(data.courses || [])
      } else {
        toast.error(data.message || 'Failed to fetch courses')
      }
    } catch (error) {
      toast.error('Error fetching courses: ' + error.message)
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return
    }

    try {
      setDeleteLoading(courseId)
      const { data } = await axios.delete(`/api/course/deletecourse/${courseId}`)
      
      if (data.success) {
        toast.success('Course deleted successfully!')
        setCourses(courses.filter(course => course._id !== courseId))
      } else {
        toast.error(data.message || 'Failed to delete course')
      }
    } catch (error) {
      toast.error('Error deleting course: ' + error.message)
      console.error('Error deleting course:', error)
    } finally {
      setDeleteLoading(null)
    }
  }

  // Edit course
  const handleEditCourse = (courseId) => {
    navigate(`/seller/editcourse/${courseId}`)
  }

  // View course details
  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`)
  }

  // Filter and sort courses
  const filteredAndSortedCourses = React.useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter
      return matchesSearch && matchesCategory
    })

    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [courses, searchTerm, categoryFilter, sortBy, sortOrder])

  useEffect(() => {
    fetchCourses()
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const cardClass = `rounded-lg shadow-sm border ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200'
  }`

  const inputClass = `px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    theme === 'dark' 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-black placeholder-gray-500'
  }`

  const selectClass = `px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    theme === 'dark' 
      ? 'bg-gray-700 border-gray-600 text-white' 
      : 'bg-white border-gray-300 text-black'
  }`

  const buttonClass = `px-3 py-1.5 rounded-lg font-medium transition-colors text-sm`

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <SellerNavbar />
      </div>
      
      {/* Main layout */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        {isMobile ? (
          <>
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <div 
              className={`fixed left-0 top-16 bottom-0 z-40 transition-transform duration-300 transform ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <SellerSidebar 
                isOpen={true}
                setIsOpen={setSidebarOpen} 
              />
            </div>
          </>
        ) : (
          <div 
            className={`fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 ${
              sidebarOpen ? 'w-[250px]' : 'w-[70px]'
            }`}
          >
            <SellerSidebar 
              isOpen={sidebarOpen} 
              setIsOpen={setSidebarOpen} 
            />
          </div>
        )}
        
        {/* Main content */}
        <div 
          className={`flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
          } ${
            isMobile ? 'ml-0' : (sidebarOpen ? 'ml-[250px]' : 'ml-[70px]')
          }`}
        >
          {/* Mobile sidebar toggle */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="mb-4 p-2 bg-white rounded-lg shadow-sm border border-gray-200 md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <div className="max-w-full mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">My Courses</h1>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage and track all your courses
              </p>
            </div>

            {/* Filters and Search */}
            <div className={`${cardClass} p-4 md:p-6 mb-6`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`${inputClass} pl-10`}
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className={`${selectClass} pl-10`}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={selectClass}
                >
                  <option value="createdAt">Created Date</option>
                  <option value="updatedAt">Updated Date</option>
                  <option value="title">Title</option>
                  <option value="price">Price</option>
                  <option value="totalNumberOfLessons">Lessons</option>
                </select>

                {/* Sort Order */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className={selectClass}
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-lg">Loading courses...</p>
              </div>
            ) : (
              <>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className={`${cardClass} p-4`}>
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Eye className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Total Courses</p>
                        <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${cardClass} p-4`}>
  <div className="flex items-center">
    <div className="p-2 bg-green-100 rounded-lg">
      <DollarSign className="w-6 h-6 text-green-600" />
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-gray-500">Total Revenue</p>
      <p className="text-2xl font-bold text-green-600">
        {formatPrice(courses.reduce((sum, course) => {
          // Use discounted price if it exists and is less than original price
          const effectivePrice = course.discountedPrice && course.discountedPrice < course.price 
            ? course.discountedPrice 
            : course.price;
          return sum + effectivePrice;
        }, 0))}
      </p>
    </div>
  </div>
</div>
                  
                  <div className={`${cardClass} p-4`}>
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Total Hours</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {courses.reduce((sum, course) => sum + course.totalHours, 0)}h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Courses Table */}
                <div className={`${cardClass} overflow-hidden`}>
                  {filteredAndSortedCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Eye className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchTerm || categoryFilter !== 'All' 
                          ? 'Try adjusting your search or filters' 
                          : 'Get started by creating your first course'
                        }
                      </p>
                      <button
                        onClick={() => navigate('/seller/addcourse')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Create Course
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Course
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Lessons
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Duration
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                          {filteredAndSortedCourses.map((course) => (
                            <tr key={course._id} className={`hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-12 w-16">
                                    <img
                                      className="h-12 w-16 rounded-lg object-cover"
                                      src={course.thumbnail || '/placeholder-image.jpg'}
                                      alt={course.title}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium">
                                      {course.title}
                                    </div>
                                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} truncate max-w-xs`}>
                                      {course.description}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {course.category}
                                </span>
                              </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
  {course.discountedPrice && course.discountedPrice < course.price ? (
    // Show discounted price scenario
    <>
      <div className="text-sm font-medium text-green-600">
        {formatPrice(course.discountedPrice)}
      </div>
      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} line-through`}>
        {formatPrice(course.price)}
      </div>
    </>
  ) : (
    // Show regular price
    <div className="text-sm font-medium">
      {formatPrice(course.price)}
    </div>
  )}
</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {course.totalNumberOfLessons} lessons
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {course.totalHours}h
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {formatDate(course.createdAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleViewCourse(course._id)}
                                    className={`${buttonClass} bg-green-600 hover:bg-green-700 text-white`}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleEditCourse(course._id)}
                                    className={`${buttonClass} bg-blue-600 hover:bg-blue-700 text-white`}
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCourse(course._id)}
                                    disabled={deleteLoading === course._id}
                                    className={`${buttonClass} bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                                  >
                                    {deleteLoading === course._id ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
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
                  )}
                </div>

                {/* Results count */}
                {filteredAndSortedCourses.length > 0 && (
                  <div className="mt-4 text-center">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Showing {filteredAndSortedCourses.length} of {courses.length} courses
                    </p>
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

export default SellerCoursesTable