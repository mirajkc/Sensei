import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import SellerNavbar from '../../components/seller components/SellerNavbar';
import SellerSidebar from '../../components/seller components/SellerSidebar';

const SellerSetting = () => {
  const { theme } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // All seller fields
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [bio, setBio] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");

  // Handle mobile view
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch seller data
  const getSellerData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/seller/getsellerbyid');
      if (!data.success) return toast.error(data.message);

      const seller = data.seller;
      setName(seller.name || "");
      setImage(seller.image || null);
      setImagePreview(seller.image || null);
      setBio(seller.bio || "");
      setSpecialization(seller.specialization || "");
      setQualification(seller.qualification || "");
      setExperience(seller.experience || "");
      setLocation(seller.location || "");
      setContactNumber(seller.contactNumber || "");
      setWebsite(seller.socialLinks?.website || "");
      setLinkedin(seller.socialLinks?.linkedin || "");
      setGithub(seller.socialLinks?.github || "");
      setTwitter(seller.socialLinks?.twitter || "");
      setYoutube(seller.socialLinks?.youtube || "");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSellerData();
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword1", newPassword1);
      formData.append("newPassword2", newPassword2);
      formData.append("bio", bio);
      formData.append("specialization", specialization);
      formData.append("qualification", qualification);
      formData.append("experience", experience);
      formData.append("location", location);
      formData.append("contactNumber", contactNumber);
      formData.append("website", website);
      formData.append("linkedin", linkedin);
      formData.append("github", github);
      formData.append("twitter", twitter);
      formData.append("youtube", youtube);
      if (image) formData.append("image", image);

      const { data } = await axios.post('/api/seller/updateseller', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (data.success) {
        toast.success("Seller updated successfully!");
        getSellerData(); // Refresh data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-700' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50'
  }`;

  const labelClasses = `block text-sm font-medium mb-2 ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  }`;

  const cardClasses = `rounded-xl shadow-lg border transition-all duration-200 ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-700 shadow-gray-900/20' 
      : 'bg-white border-gray-200 shadow-gray-200/50'
  }`;

  const sectionTitleClasses = `text-lg font-semibold mb-4 flex items-center gap-2 ${
    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
  }`;

  if (loading) {
    return (
      <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
        <div className="fixed top-0 left-0 right-0 z-50 h-16">
          <SellerNavbar />
        </div>
        <div className="flex flex-1 pt-16 items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <SellerNavbar />
      </div>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        {!isMobile && (
          <div className={`fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 ${sidebarOpen ? 'w-[250px]' : 'w-[70px]'}`}>
            <SellerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          </div>
        )}

        {/* Mobile sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
            <div className="w-[250px] h-full">
              <SellerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className={`flex-1 overflow-y-auto p-4 lg:p-6 transition-all duration-300 ${
          !isMobile ? (sidebarOpen ? 'ml-[250px]' : 'ml-[70px]') : ''
        }`}>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className={`text-2xl lg:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Seller Settings
              </h1>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Update your profile information and settings
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Image Section */}
            <div className={cardClasses}>
              <div className="p-6">
                <h2 className={sectionTitleClasses}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile Picture
                </h2>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                      />
                    ) : (
                      <div className={`w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className={labelClasses}>Upload New Image</label>
                    <input
                      className={inputClasses}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Recommended: Square image, at least 200x200 pixels
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className={cardClasses}>
              <div className="p-6">
                <h2 className={sectionTitleClasses}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Full Name *</label>
                    <input
                      className={inputClasses}
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Contact Number</label>
                    <input
                      className={inputClasses}
                      type="text"
                      value={contactNumber}
                      onChange={e => setContactNumber(e.target.value)}
                      placeholder="Enter your contact number"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Location</label>
                    <input
                      className={inputClasses}
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="Enter your location"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Experience</label>
                    <input
                      className={inputClasses}
                      type="text"
                      value={experience}
                      onChange={e => setExperience(e.target.value)}
                      placeholder="Years of experience"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className={labelClasses}>Bio</label>
                    <textarea
                      className={`${inputClasses} resize-none`}
                      rows={4}
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className={cardClasses}>
              <div className="p-6">
                <h2 className={sectionTitleClasses}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  Professional Information
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Specialization</label>
                    <input
                      className={inputClasses}
                      type="text"
                      value={specialization}
                      onChange={e => setSpecialization(e.target.value)}
                      placeholder="Your area of expertise"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Qualification</label>
                    <input
                      className={inputClasses}
                      type="text"
                      value={qualification}
                      onChange={e => setQualification(e.target.value)}
                      placeholder="Your qualifications"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className={cardClasses}>
              <div className="p-6">
                <h2 className={sectionTitleClasses}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Social Links & Website
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Website</label>
                    <input
                      className={inputClasses}
                      type="url"
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                      placeholder="https://your-website.com"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>LinkedIn</label>
                    <input
                      className={inputClasses}
                      type="url"
                      value={linkedin}
                      onChange={e => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>GitHub</label>
                    <input
                      className={inputClasses}
                      type="url"
                      value={github}
                      onChange={e => setGithub(e.target.value)}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Twitter</label>
                    <input
                      className={inputClasses}
                      type="url"
                      value={twitter}
                      onChange={e => setTwitter(e.target.value)}
                      placeholder="https://twitter.com/yourusername"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>YouTube</label>
                    <input
                      className={inputClasses}
                      type="url"
                      value={youtube}
                      onChange={e => setYoutube(e.target.value)}
                      placeholder="https://youtube.com/@yourchannel"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className={cardClasses}>
              <div className="p-6">
                <h2 className={sectionTitleClasses}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Change Password
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <label className={labelClasses}>Current Password</label>
                    <input
                      className={inputClasses}
                      type="password"
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>New Password</label>
                    <input
                      className={inputClasses}
                      type="password"
                      value={newPassword1}
                      onChange={e => setNewPassword1(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Confirm New Password</label>
                    <input
                      className={inputClasses}
                      type="password"
                      value={newPassword2}
                      onChange={e => setNewPassword2(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300'
                }`}
              >
                Reset Changes
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  loading 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg'
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </div>
                ) : (
                  'Update Settings'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerSetting;