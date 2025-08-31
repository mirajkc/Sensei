import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Star, Users, ThumbsUp, BookOpen, Globe, Linkedin, Github, Twitter, Youtube } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useEffect } from 'react'

const InstructorDetails = ({ course, theme }) => {

  const [sellerData, setSellerData] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() 
   
  //* make the api call to get the seller details 

  const getSellerDetails = async() => {
    try {
      setLoading(true) 
      const {data} = await axios.get(`/api/seller/getSellerDetails/${course.seller._id}`)
      if(!data.success){
        return toast.error(data.message)
      }else{
        setSellerData(data) 
      }
    } catch (error) {
      return toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ 
    if(course?.seller?._id) {
      getSellerDetails() 
    }
  }, [course?.seller?._id]) 
  

  if (loading || !sellerData) {
    return (
      <div className={`p-6 rounded-xl border transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-center py-8">
          <div className={`text-center ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Loading instructor details...
          </div>
        </div>
      </div>
    )
  }

  const { seller, rating, totalCourses, totalLike } = sellerData


  const formatJoinDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.getFullYear()
    } catch {
      return '2020'
    }
  }

 
  const instructorStats = {
    students: 45687, 
    courses: totalCourses || 0,
    likes: totalLike || 0,
  }

  const renderSocialLink = (platform, url, IconComponent) => {
    if (!url) return null
    
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-2 rounded-lg transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
        }`}
        aria-label={`Visit ${platform}`}
      >
        <IconComponent size={18} />
      </a>
    )
  }

  return (
    <div className={`p-6 rounded-xl border transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
    }`}>
      {/* Main Instructor Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side - Instructor Image & Basic Info */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/4">
          <div className="relative mb-4">
            <img 
              src={seller?.image || '/default-instructor.jpg'} 
              alt={seller?.name || 'Instructor'}
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-blue-500"
            />
            <div className={`absolute -bottom-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${
              theme === 'dark'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 text-white'
            }`}>
              Instructor
            </div>
          </div>
          
          <h3 className={`text-xl font-bold text-center lg:text-left mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {seller?.name || 'Unknown Instructor'}
          </h3>
          
          <p className={`text-sm font-medium text-center lg:text-left mb-3 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {seller?.specialization || 'Full Stack Developer'}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star 
                size={16} 
                className={`fill-current ${
                  theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
                }`} 
              />
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {rating?.toFixed(1) || '0.0'} instructor rating
              </span>
            </div>
          </div>

          {/* Social Links */}
          {(seller?.socialLinks?.website || 
            seller?.socialLinks?.linkedin || 
            seller?.socialLinks?.github || 
            seller?.socialLinks?.twitter || 
            seller?.socialLinks?.youtube) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {renderSocialLink('Website', seller?.socialLinks?.website, Globe)}
              {renderSocialLink('LinkedIn', seller?.socialLinks?.linkedin, Linkedin)}
              {renderSocialLink('GitHub', seller?.socialLinks?.github, Github)}
              {renderSocialLink('Twitter', seller?.socialLinks?.twitter, Twitter)}
              {renderSocialLink('YouTube', seller?.socialLinks?.youtube, Youtube)}
            </div>
          )}
        </div>

        {/* Right Side - Details & Stats */}
        <div className="flex-1 lg:w-3/4">
          
          {/* Instructor Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className={`text-center p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <Users size={20} className={`mx-auto mb-1 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
              }`} />
              <div className={`text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {instructorStats.students.toLocaleString()}
              </div>
              <div className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Students
              </div>
            </div>

            <div className={`text-center p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <BookOpen size={20} className={`mx-auto mb-1 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-500'
              }`} />
              <div className={`text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {instructorStats.courses}
              </div>
              <div className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Courses
              </div>
            </div>

            <div className={`text-center p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <ThumbsUp size={20} className={`mx-auto mb-1 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-500'
              }`} />
              <div className={`text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {instructorStats.likes}
              </div>
              <div className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Likes
              </div>
            </div>

            <div className={`text-center p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <Calendar size={20} className={`mx-auto mb-1 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-500'
              }`} />
              <div className={`text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {formatJoinDate(seller?.createdAt)}
              </div>
              <div className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Since
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            <h4 className={`text-lg font-semibold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              About the Instructor
            </h4>
            <p className={`leading-relaxed mb-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {seller?.bio 
                ? `Hi, I am ${seller.name}. ${seller.bio}` 
                : `Hi, I am ${seller?.name || 'the instructor'}. I am a passionate educator specializing in ${seller?.specialization || 'web development'}.`
              }
              {seller?.specialization && ` I specialize in ${seller.specialization}.`}
              {seller?.qualification && ` I am qualified in ${seller.qualification}.`}
              {seller?.experience && ` I have ${seller.experience} of experience in the field.`}
            </p>

            {/* Additional Details */}
            {(seller?.qualification || seller?.experience || seller?.location) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {seller?.qualification && (
                  <div className={`p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Qualification
                    </div>
                    <div className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {seller.qualification}
                    </div>
                  </div>
                )}
                
                {seller?.experience && (
                  <div className={`p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Experience
                    </div>
                    <div className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {seller.experience}
                    </div>
                  </div>
                )}
                
                {seller?.location && (
                  <div className={`p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Location
                    </div>
                    <div className={`font-semibold flex items-center gap-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <MapPin size={14} />
                      {seller.location}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* View More Button */}
          <button
            onClick={() => {navigate(`/instructordetails/${seller?._id}`) ; scrollTo(0,0)}}
            className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/30'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'
            }`}
          >
            View Full Instructor Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstructorDetails