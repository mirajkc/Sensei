import React, { useState, useEffect } from "react";
import SellerNavbar from "../../components/seller components/SellerNavbar";
import SellerSidebar from "../../components/seller components/SellerSidebar";
import useAppContext from "../../context/AppContext";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { 
  Upload, 
  DollarSign, 
  FileText, 
  Play, 
  Image as ImageIcon, 
  Tag, 
  BookOpen,
  Save,
  Eye
} from 'lucide-react';

const AddNewCourse = () => {
  const { theme } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [trailer, setTrailer] = useState(""); 
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "Web Development",
    "Digital Marketing", 
    "Data Science",
    "Front End Development",
    "Back End Development",
    "Others"
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  // Get YouTube embed URL for preview
  const getYouTubeEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("youtube.com") && parsedUrl.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
      }
      if (parsedUrl.hostname === "youtu.be") {
        return `https://www.youtube.com/embed${parsedUrl.pathname}`;
      }
      return null; 
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!thumbnail) {
      toast.error("Please upload a thumbnail");
      return;
    }
    if (!title.trim()) {
      toast.error("Course title is required");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    if (!description.trim()) {
      toast.error("Course description is required");
      return;
    }
    if (!price || price <= 0) {
      toast.error("Valid price is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("trailer", trailer);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discountedPrice", discountedPrice);
    formData.append("image", thumbnail);

    setLoading(true);

    try {
      const res = await axios.post('/api/course/addcourse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      const data = res.data;

      if (data.success) {
        toast.success(`Course created successfully!`);
        // Reset form
        setTitle("");
        setCategory("");
        setTrailer("");
        setDescription("");
        setPrice("");
        setDiscountedPrice("");
        setThumbnail(null);
        setThumbnailPreview(null);

        // Navigate to edit course page
        navigate(`/seller/editcourse/${data.courseId}`);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-black placeholder-gray-500'
  }`;

  const labelClass = `block text-sm font-medium mb-2 ${
    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
  }`;

  const cardClass = `p-6 rounded-lg shadow-lg border ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200'
  }`;

  const buttonClass = `px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2`;

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
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
          } ${
            isMobile ? 'ml-0' : (sidebarOpen ? 'ml-[250px]' : 'ml-[70px]')
          }`}
        >
          {/* Mobile sidebar toggle */}
          <div className="p-4 md:p-6">
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

            <div className="w-full">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <h1 className="text-2xl md:text-3xl font-bold">Create New Course</h1>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Fill in the details below to create your new course. You can add lessons after creation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className={cardClass}>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Basic Information
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Course Title */}
                    <div className="lg:col-span-2">
                      <label className={labelClass}>
                        Course Title *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Complete Web Development Bootcamp"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={inputClass}
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className={labelClass}>
                        Category *
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className={`${inputClass} pl-10`}
                          required
                        >
                          <option value="">-- Select Category --</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <label className={labelClass}>
                        Price *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className={`${inputClass} pl-10`}
                          placeholder="99.99"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    {/* Discounted Price */}
                    <div>
                      <label className={labelClass}>
                        Discounted Price
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={discountedPrice}
                          onChange={(e) => setDiscountedPrice(e.target.value)}
                          className={`${inputClass} pl-10`}
                          placeholder="79.99"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Optional: Leave empty if no discount</p>
                    </div>

                    {/* Description */}
                    <div className="lg:col-span-2">
                      <label className={labelClass}>
                        Course Description *
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`${inputClass} h-32 resize-vertical`}
                        placeholder="Describe what students will learn in this course..."
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {description.length}/500 characters
                      </p>
                    </div>
                  </div>
                </div>

                {/* Media Content */}
                <div className={cardClass}>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    Media Content
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Thumbnail Upload */}
                    <div>
                      <label className={labelClass}>
                        Course Thumbnail *
                      </label>
                      <div className="space-y-4">
                        <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          theme === 'dark' 
                            ? 'border-gray-600 hover:border-gray-500' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}>
                          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <input
                            type="file"
                            onChange={handleThumbnailChange}
                            className="hidden"
                            accept="image/*"
                            id="thumbnail-upload"
                            required
                          />
                          <label 
                            htmlFor="thumbnail-upload"
                            className="cursor-pointer block"
                          >
                            <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                              Click to upload
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </label>
                        </div>
                        
                        {thumbnailPreview && (
                          <div className="relative">
                            <img
                              src={thumbnailPreview}
                              alt="Course thumbnail preview"
                              className="w-full h-40 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setThumbnail(null);
                                setThumbnailPreview(null);
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Trailer Video */}
                    <div>
                      <label className={labelClass}>
                        Trailer Video URL
                      </label>
                      <div className="space-y-4">
                        <div className="relative">
                          <Play className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="url"
                            value={trailer}
                            onChange={(e) => setTrailer(e.target.value)}
                            className={`${inputClass} pl-10`}
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                        </div>
                        
                        {getYouTubeEmbedUrl(trailer) && (
                          <div className="relative w-full h-40">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md border"
                              src={getYouTubeEmbedUrl(trailer)}
                              title="Course Trailer Preview"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-500">
                          Optional: Add a YouTube trailer to showcase your course
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className={`${buttonClass} ${
                      theme === 'dark'
                        ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${buttonClass} bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Creating Course...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Create Course
                      </>
                    )}
                  </button>
                </div>

                {/* Info Note */}
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-1">
                        What happens next?
                      </h3>
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        After creating your course, you'll be redirected to the course editor where you can add lessons, 
                        upload videos, and structure your course content.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCourse;