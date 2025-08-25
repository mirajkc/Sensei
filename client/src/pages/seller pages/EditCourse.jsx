import React, { useState, useEffect } from "react";
import useAppContext from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import SellerNavbar from "../../components/seller components/SellerNavbar";
import AddNewLesson from "../../components/seller components/AddNewLesson";
import { Tag } from "lucide-react";

const EditCourse = () => {
  const { theme } = useAppContext();
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [trailer, setTrailer] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [language, setLanguage] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [whatYouWillLearn , setWhatYouWillLearn] = useState("")

  const categories = [
    "Web Development",
    "Digital Marketing",
    "Data Science",
    "Front End Development",
    "Back End Development",
    "Others",
  ];

  const skillLevels = ["Beginner", "Intermediate", "Advanced"];

  // Fetch course data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/course/getcoursebyid/${courseId}`);

      if (!data.success) {
        toast.error(data.message);
      } else {
        const course = data.course;
        setTitle(course.title || "");
        setCategory(course.category || "");
        setTrailer(course.trailer || "");
        setDescription(course.description || "");
        setPrice(course.price || "");
        setDiscountedPrice(course.discountedPrice || "");
        setThumbnail(course.thumbnail || null);
        setLessons(course.lessons || []);
        setCreatedAt(course.createdAt || "");
        setUpdatedAt(course.updatedAt || "");
        setLanguage(course.language || "");
        setSkillLevel(course.skillLevel || "");
        setWhatYouWillLearn(course.whatYouWillLearn || "")
      }
    } catch (error) {
      toast.error("Server error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [courseId]);

  // Handle thumbnail change
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnail(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Course title is required");
    if (!category.trim()) return toast.error("Category is required");
    if (!description.trim()) return toast.error("Description is required");
    if (!price || price <= 0) return toast.error("Valid price is required");
    if (!language) return toast.error("At least one language is required");
    if (!skillLevel) return toast.error("At least one skill level is required");
    if (!whatYouWillLearn) return toast.error("Please enter what people will learn from this course");

    try {
      setUpdateLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("trailer", trailer);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discountedPrice", discountedPrice);
      formData.append("lessons", JSON.stringify(lessons));
      formData.append("skillLevel", skillLevel);
      formData.append("language", language);
      formData.append("whatYouWillLearn" , whatYouWillLearn)

      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      const { data } = await axios.post(
        `/api/course/updatecourse/${courseId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success("Course updated successfully!");
        fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Update failed: " + error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Input, button, card classes
  const inputClass = `w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    theme === "dark"
      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-black placeholder-gray-500"
  }`;

  const buttonClass = `px-6 py-2 rounded-lg font-medium transition-colors ${
    theme === "dark"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-500 hover:bg-blue-600 text-white"
  }`;

  const cardClass = `p-6 rounded-lg shadow-lg ${
    theme === "dark" ? "bg-gray-800" : "bg-white"
  }`;

  const getYouTubeEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtube.com") && parsedUrl.searchParams.get("v"))
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;

      if (parsedUrl.hostname === "youtu.be") return `https://www.youtube.com/embed${parsedUrl.pathname}`;

      return null;
    } catch {
      return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <SellerNavbar />
      <div className="flex flex-1">
        <main
          className={`flex-1 p-6 overflow-auto ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
          }`}
        >
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-6">Edit Course</h1>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-lg">Loading course data...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Basic Information */}
                <div className={cardClass}>
                  <h2 className="text-xl font-semibold mb-4">Course Information</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Course Title *</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={inputClass}
                        placeholder="Enter course title"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
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
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Skill Level */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Skill Level *
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          value={skillLevel}
                          onChange={(e) => setSkillLevel(e.target.value)}
                          className={`${inputClass} pl-10`}
                          required
                        >
                          <option value="">-- Select Skill Level --</option>
                          {skillLevels.map((lvl) => (
                            <option key={lvl} value={lvl}>
                              {lvl}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Price *</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={inputClass}
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    {/* Discounted Price */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Discounted Price</label>
                      <input
                        type="number"
                        value={discountedPrice}
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                        className={inputClass}
                        placeholder="Enter discounted price"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Trailer */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Trailer URL</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <input
                        type="url"
                        value={trailer}
                        onChange={(e) => setTrailer(e.target.value)}
                        className={inputClass}
                        placeholder="Enter trailer video URL"
                      />
                      {getYouTubeEmbedUrl(trailer) && (
                        <div className="relative w-72 h-40">
                          <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md border"
                            src={getYouTubeEmbedUrl(trailer)}
                            title="Course Trailer Preview"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <label
                      className={`block my-4 text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Please enter languages used
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={`${inputClass} pl-10`}
                        placeholder="eg: HTML, CSS, JS (Note comma is required after each language)"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">What you will learn *</label>
                    <textarea
                      value={whatYouWillLearn}
                      onChange={(e) => setWhatYouWillLearn(e.target.value)}
                      className={`${inputClass} h-32 resize-vertical`}
                      placeholder="Please enter what the viewer will be able to learn from this course"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`${inputClass} h-32 resize-vertical`}
                      placeholder="Enter course description"
                      required
                    />
                  </div>

                  {/* Thumbnail */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Course Thumbnail</label>
                    <input
                      type="file"
                      onChange={handleThumbnailChange}
                      className={inputClass}
                      accept="image/*"
                    />
                    {thumbnail && (
                      <div className="mt-3">
                        <img
                          src={thumbnail}
                          alt="Course thumbnail preview"
                          className="w-40 h-28 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Course Metadata */}
                <div className={cardClass}>
                  <h2 className="text-xl font-semibold mb-4">Course Metadata</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Created At</label>
                      <input
                        type="text"
                        value={createdAt ? new Date(createdAt).toLocaleString() : ""}
                        className={`${inputClass} ${
                          theme === "dark" ? "bg-gray-600" : "bg-gray-100"
                        } cursor-not-allowed`}
                        disabled
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Updated</label>
                      <input
                        type="text"
                        value={updatedAt ? new Date(updatedAt).toLocaleString() : ""}
                        className={`${inputClass} ${
                          theme === "dark" ? "bg-gray-600" : "bg-gray-100"
                        } cursor-not-allowed`}
                        disabled
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className={`px-8 py-3 rounded-lg font-medium border transition-colors ${
                      theme === "dark"
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updateLoading}
                    className={`${buttonClass} px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updateLoading ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </span>
                    ) : (
                      "Update Course"
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6">
              <AddNewLesson courseId={courseId} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditCourse;
