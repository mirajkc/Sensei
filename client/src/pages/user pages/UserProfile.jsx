import React from 'react'
import useAppContext from '../../context/AppContext.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useEffect } from 'react'

const UserProfile = () => {
  const { theme } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [userData, setUserdata] = useState([])
  const [name, setName] = useState('')
  const [picture, setPicture] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('') //* for changing password
  const [newPassword1, setNewPassword1] = useState('') //! by default google OAuth users have password = null so if pass == null we won't show change password section
  const [newPassword2, setNewPassword2] = useState('')
  const [phoneno, setPhoneno] = useState('')
  const [address, setAddress] = useState('')
  const [bio, setBio] = useState('')
  const [link, setLink] = useState('') //* portfolio website
  const [linkedin, setLinkedIn] = useState('')
  const [github, setGitHub] = useState('')
  const [twitter, setTwitter] = useState('')
  const [facebook, setFacebook] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [achievements, setAchievements] = useState('')
  const [grade, setGrade] = useState('')

  //* make api call to get the user details
  const getUseraDetail = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/user/detailsbyid')
      if (!data.success) {
        setLoading(false)
        return toast.error(data.message)
      }

      const user = data.student
      setUserdata(user)
      setName(user.name || "")
      setPicture(user.picture || "")
      setImagePreview(user.picture || "")
      setPhoneno(user.phoneno || "")
      setAddress(user.address || "")
      setBio(user.bio || "")
      setLink(user.link || "")
      setLinkedIn(user.linkedin || "")
      setGitHub(user.github || "")
      setTwitter(user.twitter || "")
      setFacebook(user.facebook || "")
      setSpecialization(user.specialization || "")
      setAchievements(user.achievements || "")
      setGrade(user.grade || "")
      setPassword(user.password || '')

      setLoading(false)
    } catch (error) {
      setLoading(false)
      return toast.error(error.message)
    }
  }

  useEffect(() => {
    getUseraDetail()
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneno", phoneno);
    formData.append("address", address);
    formData.append("bio", bio);
    formData.append("link", link);
    formData.append("linkedin", linkedin);
    formData.append("github", github);
    formData.append("twitter", twitter);
    formData.append("facebook", facebook);
    formData.append("specialization", specialization);
    formData.append("achievements", achievements);
    formData.append("grade", grade);

    if (password && password.length > 0) {
      if (oldPassword) formData.append("oldPassword", oldPassword);
      if (newPassword1) formData.append("newPassword1", newPassword1);
      if (newPassword2) formData.append("newPassword2", newPassword1);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const { data } = await axios.post("/api/user/updateuserbyid", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!data.success) {
      return toast.error(data.message);
    }

    toast.success(data.message);
    getUseraDetail();

  } catch (error) {
    return toast.error(error.message);
  } finally {
    setLoading(false);
  }
};
 
  return (
    <div className={`min-h-screen w-full p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-auto mx-auto">
        {/* Header Section */}
        <div className={`mb-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            User Profile
          </h1>
          <h2 className={`text-lg mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Update and Review your details here
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Note: Other users won't be able to view your user profile. Only teachers of courses which you are enrolled in will be able to view.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-600'}`}></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Main Profile Form */}
            <form onSubmit={handleSubmit} className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
              <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Profile Information
              </h3>

              {/* Profile Image Section */}
              <div className="mb-8">
                <label className={`block text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Profile Picture
                </label>
                <div className="flex items-center space-x-6">
                  {/* Image Preview */}
                  <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Button */}
                  <div>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className={`cursor-pointer inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200 ${
                        theme === 'dark'
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Change Photo
                    </label>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      JPG, PNG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Grade/Level
                  </label>
                  <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    placeholder="e.g., Grade 12, Bachelor's, etc."
                  />
                </div>

                {/* Specialization */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Field of Study/Specialization
                  </label>
                  <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    placeholder="e.g., Computer Science, Mathematics"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mt-6">
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  placeholder="Enter your complete address"
                />
              </div>

              {/* Bio */}
              <div className="mt-6">
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Bio
                </label>
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  placeholder="Tell us about yourself, your interests, goals..."
                />
              </div>

              {/* Achievements */}
              <div className="mt-6">
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Achievements & Awards
                </label>
                <textarea
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  placeholder="List your achievements, awards, certifications..."
                />
              </div>

              {/* Social Links Section */}
              <h4 className={`text-lg font-semibold mt-8 mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Social Links & Portfolio
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Portfolio Website */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                {/* GitHub */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGitHub(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    placeholder="https://github.com/username"
                  />
                </div>

                {/* Twitter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Twitter Profile
                  </label>
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    placeholder="https://twitter.com/username"
                  />
                </div>

                {/* Facebook */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Facebook Profile
                  </label>
                  <input
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    placeholder="https://facebook.com/username"
                  />
                </div>
              </div>

              {/* Password Change Section */}
              {password && password.length > 0 ? (
                <div className="mt-8">
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Change Password
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Old Password */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        placeholder="Enter current password"
                      />
                    </div>

                    {/* New Password */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword1}
                        onChange={(e) => setNewPassword1(e.target.value)}
                        className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        placeholder="Enter new password"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.target.value)}
                        className={`w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  {/* Password validation messages */}
                  {newPassword1 && newPassword2 && newPassword1 !== newPassword2 && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Passwords do not match
                    </p>
                  )}
                  
                  {newPassword1 && newPassword1.length < 6 && (
                    <p className="text-yellow-500 text-sm mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Password should be at least 6 characters long
                    </p>
                  )}
                </div>
              ) : (
                <div className={`mt-8 p-4 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'}`}>
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0h-2m6-8a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      🔒 Password change not available for Google OAuth users
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Your account is secured through Google authentication
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className={`px-8 py-3 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400'
                      : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile