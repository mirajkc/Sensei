import React, { useState } from "react";
import SellerNavbar from "../../components/seller components/SellerNavbar";
import SellerSidebar from "../../components/seller components/SellerSidebar";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import useAppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const SellerHomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const { theme, sellerDetails } = useAppContext();
  const navigate = useNavigate()

  //* API call to get the course and seller details
  const getDetails = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/course/getcoursebysellerid");
      if (!data.success) {
        return toast.error(data.message);
      } else {
        setDetails(data.courses);
      }
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //* Calculate the total revenue earned
  const revenueCalculator = () => {
    let totalRevenue = 0;
    for (let index in details) {
      totalRevenue += details[index].discountedPrice;
    }
    return Math.floor(totalRevenue);
  };

  //* Hours calculator
  const hoursCalculator = () => {
    let totalHours = 0;
    for (let item of details) {
      totalHours += item.totalHours;
    }
    return Math.floor(totalHours);
  };

  //* Lesson calculator
  const lessonCalculator = () => {
    let totalLesson = 0;
    details.forEach((item) => {
      totalLesson += item.totalNumberOfLessons;
    });
    return totalLesson;
  };

  //* Rating calculator
  const ratingCalculator = () => {
    const likes = sellerDetails?.like?.length || 0;
    const dislikes = sellerDetails?.dislike?.length || 0;
    const total = likes + dislikes;

    if (total === 0) return 0;

    const rating = (likes / total) * 5;
    return rating.toFixed(1);
  };

  //* Calculate total students (sum of comments as proxy)
  const totalStudentsCalculator = () => {
    let totalStudents = 0;
    details.forEach((course) => {
      totalStudents += course.comments?.length || 0;
    });
    return totalStudents;
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return (
      <div className={`h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
     
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <SellerNavbar />
      </div>

      {/* Main layout */}
      <div className="flex flex-1 pt-16">
        
        <div
          className={`fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 ${
            sidebarOpen ? "w-[250px]" : "w-[70px]"
          }`}
        >
          <SellerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        </div>

        {/* Main content */}
        <div
          className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${
            sidebarOpen ? "ml-[250px]" : "ml-[70px]"
          } ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className={`text-3xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Welcome back, {sellerDetails?.name || 'Seller'}!
              </h1>
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                What's on your mind today?
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Courses */}
              <div className={`p-6 rounded-xl shadow-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Total Courses
                    </p>
                    <p className={`text-3xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {details?.length || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Total Revenue */}
              <div className={`p-6 rounded-xl shadow-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Total Revenue
                    </p>
                    <p className={`text-3xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${revenueCalculator()}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Total Hours */}
              <div className={`p-6 rounded-xl shadow-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Content Hours
                    </p>
                    <p className={`text-3xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {hoursCalculator()}h
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Total Lessons */}
              <div className={`p-6 rounded-xl shadow-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Total Lessons
                    </p>
                    <p className={`text-3xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {lessonCalculator()}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Profile Card */}
            <div className={`rounded-xl shadow-lg border p-6 mb-8 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Seller Profile
              </h2>
              
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left side - Profile Info */}
                <div className="flex-shrink-0">
                  <div className="text-center">
                    <img
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                      src={sellerDetails?.image}
                      alt={sellerDetails?.name}
                    />
                    <h3 className={`text-xl font-semibold mt-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {sellerDetails?.name}
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {sellerDetails?.specialization}
                    </p>
                    <div className="flex items-center justify-center mt-2">
                      <span className="text-yellow-500 text-lg">⭐</span>
                      <span className={`ml-1 font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {ratingCalculator()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side - Details and Stats */}
                <div className="flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Details */}
                    <div>
                      <h4 className={`text-lg font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Personal Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {sellerDetails?.email}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {sellerDetails?.contactNumber}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {sellerDetails?.location}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 6v1a2 2 0 002 2h4a2 2 0 002-2v-1m-6-6h6l1 4H7l1-4z" />
                          </svg>
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {sellerDetails?.experience}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Joined: {new Date(sellerDetails?.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div>
                      <h4 className={`text-lg font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Performance Stats
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Total Likes
                          </span>
                          <span className={`font-semibold text-green-600`}>
                            {sellerDetails?.like?.length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Total Dislikes
                          </span>
                          <span className={`font-semibold text-red-600`}>
                            {sellerDetails?.dislike?.length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Total Comments
                          </span>
                          <span className={`font-semibold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {totalStudentsCalculator()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Average Rating
                          </span>
                          <span className={`font-semibold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            ⭐ {ratingCalculator()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="mt-6">
                    <h4 className={`text-lg font-semibold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Bio
                    </h4>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {sellerDetails?.bio}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="mt-6">
                    <h4 className={`text-lg font-semibold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Social Links
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {sellerDetails?.socialLinks?.website && (
                        <a
                          href={sellerDetails.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          Website
                        </a>
                      )}
                      {sellerDetails?.socialLinks?.linkedin && (
                        <a
                          href={sellerDetails.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                      {sellerDetails?.socialLinks?.github && (
                        <a
                          href={sellerDetails.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                      {sellerDetails?.socialLinks?.youtube && (
                        <a
                          href={sellerDetails.socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        >
                          YouTube
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-xl shadow-lg border p-6 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                onClick={()=>navigate('/seller/addcourse')}
                 className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">

                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Course
                </button>
                <button 
                onClick={()=>navigate('/seller/allcourse')}
                className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  All Courses
                </button>
                <button
                onClick={()=>navigate('/seller/settings')}
                 className="flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHomePage;