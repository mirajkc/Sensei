import React, { useEffect, useState } from 'react'
import useAppContext from '../../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddNewLesson = ({ courseId }) => {
  const { theme } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [lessons, setLessons] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [whatYouWillLearn, setWhatYouWillLearn] = useState('')
  const [lessonDuration, setLessonDuration] = useState('')
  const [textGuide, setTextGuide] = useState('')
  const [videoGuide, setVideoGuide] = useState('')
  const navigate = useNavigate()

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setWhatYouWillLearn('')
    setLessonDuration('')
    setTextGuide('')
    setVideoGuide('')
  }

  const getAllLesson = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/course/getalllesson/manage/${courseId}`)
      if (!data.success) { 
        toast.error(data.message)
      } else {
        setLessons(data.lessons || [])
      }
    } catch (error) {
      toast.error("Failed to fetch lessons: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllLesson()
  }, [courseId])

  const addNewLesson = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(`/api/course/addnewlesson/${courseId}`, { 
        title, 
        description, 
        lessonDuration: Number(lessonDuration), 
        whatYouWillLearn, 
        videoGuide, 
        textGuide 
      })
      if (!data.success) {
        return toast.error(data.message)
      }
      toast.success(data.message)
      resetForm()
      getAllLesson()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return
    
    try {
      setLoading(true)
      const { data } = await axios.delete(`/api/course/deletelesson/${courseId}/${lessonId}`)
      if (!data.success) {
        return toast.error(data.message)
      }
      toast.success(data.message)
      getAllLesson()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // styling classes
  const inputClass = `w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-black placeholder-gray-500'
  }`

  const textareaClass = `w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-black placeholder-gray-500'
  }`

  const labelClass = `block text-sm font-medium mb-2 ${
    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
  }`

  const buttonClass = `px-6 py-2 rounded-lg font-medium transition-colors ${
    theme === 'dark'
      ? 'bg-blue-600 hover:bg-blue-700 text-white'
      : 'bg-blue-500 hover:bg-blue-600 text-white'
  }`

  const secondaryButtonClass = `px-6 py-2 rounded-lg font-medium transition-colors ${
    theme === 'dark'
      ? 'bg-gray-600 hover:bg-gray-700 text-white'
      : 'bg-gray-500 hover:bg-gray-600 text-white'
  }`

  const cardClass = `p-6 rounded-lg shadow-lg ${
    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  }`

  const tableClass = `w-full border-collapse ${
    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  }`

  const thClass = `border p-3 text-left font-semibold ${
    theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
  }`

  const tdClass = `border p-3 ${
    theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
  }`

  return (
    <div className="mt-8 space-y-6">
      {/* Existing lessons display */}
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Course Lessons</h2>
        </div>

        {/* Lessons List */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="ml-4 text-lg">Loading lessons...</p>
            </div>
          ) : lessons.length === 0 ? (
            <div className="text-center py-12">
              <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-lg font-medium mb-2">No lessons found</p>
              <p className="text-gray-500 mb-4">Start building your course by adding your first lesson</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={thClass}>Lesson #</th>
                    <th className={thClass}>Title</th>
                    <th className={thClass}>Duration</th>
                    <th className={thClass}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson) => (
                    <tr key={lesson._id}>
                      <td className={tdClass}>{lesson.lessonNumber}</td>
                      <td className={tdClass}>{lesson.title}</td>
                      <td className={tdClass}>
                        {lesson.lessonDuration ? `${lesson.lessonDuration} hr` : 'Not specified'}
                      </td>
                      <td className={tdClass}>
                        <div className="flex gap-2">
                          <button
                            onClick={()=>navigate(`/seller/editcourse/${courseId}/editlesson/${lesson._id}`)}
                            className={`px-3 py-1 text-sm rounded ${
                              theme === 'dark'
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteLesson(lesson._id)}
                            className={`px-3 py-1 text-sm rounded ${
                              theme === 'dark'
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-red-500 hover:bg-red-600 text-white'
                            }`}
                          >
                            Delete
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
      </div>

      {/* Add new lesson form */}
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Add New Lesson</h3>
          <button onClick={resetForm} className={secondaryButtonClass}>
            Reset form
          </button>
        </div>

        <form onSubmit={addNewLesson} className="space-y-4">
          <div>
            <label className={labelClass}>
              Lesson Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., C++ Basics"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              Lesson Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Today we will learn about C++ basics"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              What You Will Learn <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={whatYouWillLearn}
              onChange={(e) => setWhatYouWillLearn(e.target.value)}
              placeholder="e.g., You will learn about C++ loops and variables"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              Lesson Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={lessonDuration}
              onChange={(e) => setLessonDuration(e.target.value)}
              placeholder="e.g., 30"
              min="1"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              Text Guide <span className="text-red-500">*</span>
            </label>
            <textarea
              value={textGuide}
              onChange={(e) => setTextGuide(e.target.value)}
              placeholder="Provide detailed text instructions for this lesson..."
              className={textareaClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              Video Guide <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={videoGuide}
              onChange={(e) => setVideoGuide(e.target.value)}
              placeholder="https://example.com/your-video-link"
              className={inputClass}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`${buttonClass} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Adding...' : 'Add Lesson'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewLesson
