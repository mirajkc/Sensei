import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAppContext from '../../context/AppContext'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'

const EditSingleBlog = () => {
  const { theme } = useAppContext()
  const { blogId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    createdBy: '',
    thumbnail: null
  })
  
  const [currentThumbnail, setCurrentThumbnail] = useState('')

  const categories = [
    'Web Development',
    'Mobile Development', 
    'Data Science',
    'Machine Learning',
    'DevOps',
    'UI/UX Design',
    'Technology',
    'Programming',
    'Tutorial'
  ]

  // Get blog details
  const getBlogDetails = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/blog/getsingleblog/${blogId}`)
      if (!data.success) {
        toast.error(data.message)
        return
      }
      
      const blog = data.blog
      setFormData({
        title: blog.title,
        content: blog.content,
        category: blog.category,
        createdBy: blog.createdBy,
        thumbnail: null
      })
      setCurrentThumbnail(blog.thumbnail)
    } catch (error) {
      toast.error('Failed to fetch blog details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBlogDetails()
  }, [blogId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }))
    }
  }

  const updateBlog = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.content || !formData.category || !formData.createdBy) {
      toast.error('Please fill all required fields')
      return
    }

    try {
      setUpdateLoading(true)
      
      const updateData = new FormData()
      updateData.append('title', formData.title)
      updateData.append('content', formData.content)
      updateData.append('category', formData.category)
      updateData.append('createdBy', formData.createdBy)
      
      if (formData.thumbnail) {
        updateData.append('thumbnail', formData.thumbnail)
      }

      const { data } = await axios.put(`/api/blog/updateblog/${blogId}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (data.success) {
        toast.success('Blog updated successfully!')
        navigate('/admin/editblogs')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to update blog')
    } finally {
      setUpdateLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
          theme === 'dark' ? 'border-white' : 'border-gray-900'
        }`}></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin/editblogs')}
            className={`flex items-center space-x-2 mb-4 text-sm ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </button>
          
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Edit Blog
          </h1>
        </div>

        {/* Form */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <form onSubmit={updateBlog} className="space-y-6">
            {/* Title */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Category & Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Author *
                </label>
                <input
                  type="text"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            {/* Current Thumbnail */}
            {currentThumbnail && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Current Thumbnail
                </label>
                <img 
                  src={currentThumbnail} 
                  alt="Current thumbnail"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}

            {/* New Thumbnail */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Change Thumbnail (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Content */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={12}
                className={`w-full px-4 py-2 rounded-lg border resize-none ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={updateLoading}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium ${
                updateLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              <Save className="w-5 h-5" />
              <span>{updateLoading ? 'Updating...' : 'Update Blog'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditSingleBlog