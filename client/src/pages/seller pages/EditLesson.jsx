import React, { useState, useEffect } from 'react'
import useAppContext from '../../context/AppContext.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import SellerNavbar from '../../components/seller components/SellerNavbar.jsx'

const EditLesson = () => {
  const { theme } = useAppContext()
  const navigate = useNavigate()
  const { courseId, lessonId } = useParams()

  const [loading, setLoading] = useState(false)
  const [lesson, setLesson] = useState({})
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [whatYouWillLearn, setWhatYouWillLearn] = useState('')
  const [lessonDuration, setLessonDuration] = useState('')
  const [textGuide, setTextGuide] = useState('')
  const [videoGuide, setVideoGuide] = useState('')

  const resetForm = () => {
    if (lesson) {
      setTitle(lesson.title || '')
      setDescription(lesson.description || '')
      setWhatYouWillLearn(lesson.whatYouWillLearn || '')
      setLessonDuration(lesson.lessonDuration || '')
      setTextGuide(lesson.textGuide || '')
      setVideoGuide(lesson.videoGuide || '')
    }
  }

  const getLessonDetail = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/course/getcourse/${courseId}/getlesson/${lessonId}`)
      if (!data.success) {
        return toast.error(data.message)
      }
      setLesson(data.lesson)
      setTitle(data.lesson.title || '')
      setDescription(data.lesson.description || '')
      setWhatYouWillLearn(data.lesson.whatYouWillLearn || '')
      setLessonDuration(data.lesson.lessonDuration || '')
      setTextGuide(data.lesson.textGuide || '')
      setVideoGuide(data.lesson.videoGuide || '')
    } catch (error) {
      toast.error("Failed to fetch lesson details: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateDetails = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(`/api/course/editcourse/${courseId}/editlesson/${lessonId}`, {
        title,
        description,
        whatYouWillLearn,
        lessonDuration,
        textGuide,
        videoGuide
      })
      if (!data.success) return toast.error(data.message)
      toast.success(data.message)
      getLessonDetail()
    } catch (error) {
      toast.error("Failed to update lesson: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getLessonDetail()
  }, [courseId, lessonId])

  // Consistent styling classes matching AddNewLesson component
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

  const dangerButtonClass = `px-6 py-2 rounded-lg font-medium transition-colors ${
    theme === 'dark'
      ? 'bg-red-600 hover:bg-red-700 text-white'
      : 'bg-red-500 hover:bg-red-600 text-white'
  }`

  const cardClass = `p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`

  const containerClass = `min-h-screen ${
    theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
  }`

  if (loading && !title) {
    return (
      <div className={containerClass}>
        <SellerNavbar />
        <div className="p-4">
          <div className={cardClass}>
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="ml-4 text-lg">Loading lesson details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <SellerNavbar />
      <div className="p-4 max-w-auto mx-auto">
        <div className={cardClass}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-400">Edit Lesson</h2>
              {lesson.title && (
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Editing: {lesson.title}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={resetForm} 
                disabled={loading} 
                className={secondaryButtonClass}
                title="Reset form to original values"
              >
                Reset Form
              </button>
              <button
                onClick={() => navigate('/seller')}
                disabled={loading}
                className={dangerButtonClass}
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          <form onSubmit={updateDetails} className="space-y-4">
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
              <textarea
              value={whatYouWillLearn}
              onChange={(e) => setWhatYouWillLearn(e.target.value)}
              placeholder="Provide detailed text instructions for this lesson..."
              className={textareaClass}
              required
            />
            </div>

            <div>
              <label className={labelClass}>
                Lesson Duration (Enter in minutes !! please note that your input will automatically converted into hour) <span className="text-red-500">*</span>
              </label>
                <input
  type="text"
  value={lessonDuration}  
  onChange={(e) => {
    const minutes = Number(e.target.value)
    const hours = (minutes / 60).toFixed(2) 
    setLessonDuration(Number(hours))
  }}
  placeholder="e.g., 7 (minutes)"
  min="0"
  className={inputClass}
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
                {loading ? 'Updating...' : 'Update Lesson'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className={secondaryButtonClass}
              >
                Revert Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
                className={secondaryButtonClass}
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditLesson