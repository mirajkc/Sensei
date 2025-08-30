import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Star, Users, ThumbsUp, BookOpen, Globe, Linkedin, Github, Twitter, Youtube } from 'lucide-react'

const InstructorDetails = ({ course, theme }) => {
  const navigate = useNavigate()
  
  // Format date for "Instructor since"
  const formatJoinDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.getFullYear()
    } catch {
      return '2020'
    }
  }

  // Hardcoded stats for now
  const instructorStats = {
    students: 45687,
    courses: 7,
    likes: 2341,
    reviews: 1254
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
              src={course.seller.image || '/default-instructor.jpg'} 
              alt={course.seller.name}
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
            {course.seller.name}
          </h3>
          
          <p className={`text-sm font-medium text-center lg:text-left mb-3 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {course.seller.specialization || 'Full Stack Developer'}
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
                {course.seller.rating || 4.8}
              </span>
            </div>
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              ({instructorStats.reviews} reviews)
            </span>
          </div>

          {/* Social Links */}
          {(course.seller.socialLinks?.website || 
            course.seller.socialLinks?.linkedin || 
            course.seller.socialLinks?.github || 
            course.seller.socialLinks?.twitter || 
            course.seller.socialLinks?.youtube) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {renderSocialLink('Website', course.seller.socialLinks?.website, Globe)}
              {renderSocialLink('LinkedIn', course.seller.socialLinks?.linkedin, Linkedin)}
              {renderSocialLink('GitHub', course.seller.socialLinks?.github, Github)}
              {renderSocialLink('Twitter', course.seller.socialLinks?.twitter, Twitter)}
              {renderSocialLink('YouTube', course.seller.socialLinks?.youtube, Youtube)}
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
                {instructorStats.likes.toLocaleString()}
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
                {formatJoinDate(course.seller.createdAt)}
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
              {course.seller.bio 
                ? `Hi, I am ${course.seller.name}. ${course.seller.bio}` 
                : `Hi, I am ${course.seller.name}. I am a passionate educator specializing in ${course.seller.specialization || 'web development'}.`
              }
              {course.seller.specialization && ` I specialize in ${course.seller.specialization}.`}
              {course.seller.qualification && ` I am qualified in ${course.seller.qualification}.`}
              {course.seller.experience && ` I have ${course.seller.experience} of experience in the field.`}
            </p>

            {/* Additional Details */}
            {(course.seller.qualification || course.seller.experience || course.seller.location) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {course.seller.qualification && (
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
                      {course.seller.qualification}
                    </div>
                  </div>
                )}
                
                {course.seller.experience && (
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
                      {course.seller.experience}
                    </div>
                  </div>
                )}
                
                {course.seller.location && (
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
                      {course.seller.location}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* View More Button */}
          <button
            onClick={() => navigate(`/sellerdetails/${course.seller._id}`)}
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