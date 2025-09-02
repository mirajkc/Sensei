import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAppContext from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Search, Filter, Clock, BookOpen, Star, Heart, Eye,
  User, ChevronDown, X, SlidersHorizontal, MessageCircle,
  Code, Palette, Database, Monitor, Globe, Award
} from "lucide-react";


const DiscoverCourses = () => {
  const { theme , loggedIn } = useAppContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLetter, setSearchLetter] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [priceOrder, setPriceOrder] = useState(""); 
  const [hoursOrder, setHoursOrder] = useState(""); 
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishList] = useState(new Set())
  const navigate = useNavigate()


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  //* Apply filters/sorting on courses
  const sortedData = courses
    .filter((course) =>
      course.title.toLowerCase().includes(searchLetter.toLowerCase())
    )
    .filter((course) =>
      selectedLevel === "All" ? true : course.skillLevel === selectedLevel
    )
    .filter((course) =>
      selectedCategory === "All" ? true : course.category === selectedCategory
    )
    .sort((a, b) => {
      if (priceOrder === "asc") return a.discountedPrice - b.discountedPrice;
      if (priceOrder === "desc") return b.discountedPrice - a.discountedPrice;
      return 0;
    })
    .sort((a, b) => {
      if (hoursOrder === "asc") return a.totalHours - b.totalHours;
      if (hoursOrder === "desc") return b.totalHours - a.totalHours;
      return 0;
    });


   const toggleWishlist = async (courseId) => {
    if(loggedIn === false){
      scrollTo(0,0)
      navigate('/login')
    }
  if (wishlist.has(courseId)) {
    // *Remove from wishlist
    try {
      const { data } = await axios.delete(`/api/wishlist/removewishlist/${courseId}`);
      if (data.success) {
        const updatedWishlist = new Set(wishlist);
        updatedWishlist.delete(courseId);
        setWishList(updatedWishlist);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  } else {
    //* Add to wishlist
    try {
      const { data } = await axios.post(`/api/wishlist/addwishlist/${courseId}`);
      if (data.success) {
        const updatedWishlist = new Set(wishlist);
        updatedWishlist.add(courseId);
        setWishList(updatedWishlist);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
};

  //* get wishlist on mount
const getAllWishlist = async() => {
  try {
    const {data} = await axios.get(`/api/wishlist/getallwishList`)
    if(data.success){ 
      const wishlistSet = new Set(data.wishlists.map(course => course._id))
      setWishList(wishlistSet)
    } else {
      console.log(data.message)
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message) 
  }
}

  //* Get skill level color
  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Advanced':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  //* Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Development':
        return <Globe className="w-4 h-4" />;
      case 'Front End Development':
        return <Monitor className="w-4 h-4" />;
      case 'Back End Development':
        return <Database className="w-4 h-4" />;
      case 'Data Science':
        return <Code className="w-4 h-4" />;
      case 'Digital Marketing':
        return <Award className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  //* Fetch courses from API
  const getAllCourse = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/course/getAllCourseForUI");
      if (!data.success) {
        return toast.error(data.message);
      }
      setCourses(data.courses);
    } catch (error) {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchLetter("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setPriceOrder("");
    setHoursOrder("");
  };

  useEffect(() => {
    getAllCourse();
    getAllWishlist()
  }, []);

  const categories = [
    "All",
    "Web Development",
    "Digital Marketing", 
    "Data Science",
    "Front End Development",
    "Back End Development",
    "Others"
  ];

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <motion.div
          animate={{ 
            rotate: 360
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }
    const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">☆</span>
      );
    }

    return stars;
  };

  return (
    <div className={`min-h-screen ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Header Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-40 backdrop-blur-md border-b ${
          theme === "dark" 
            ? "bg-gray-900/90 border-gray-700" 
            : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Discover Amazing Courses
              </h1>
              <p className={`text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                Find the perfect course to advance your skills and career
              </p>
            </motion.div>
            
            {/* Search Bar */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, skills, or topics..."
                value={searchLetter}
                onChange={(e) => setSearchLetter(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  theme === "dark" 
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                }`}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`mb-8 p-6 rounded-2xl shadow-lg ${
            theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Filters</h3>
              <span className={`text-sm px-2 py-1 rounded-full ${
                theme === "dark" ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-600"
              }`}>
                {sortedData.length} courses
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden px-3 py-2 rounded-lg border transition-colors ${
                  theme === "dark" 
                    ? "border-gray-600 hover:border-gray-500 hover:bg-gray-700" 
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: showFilters || window.innerWidth >= 1024 ? "auto" : 0, 
                opacity: showFilters || window.innerWidth >= 1024 ? 1 : 0 
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={`w-full p-3 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        theme === "dark" 
                          ? "bg-gray-700 border-gray-600 text-white" 
                          : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <div className="relative">
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className={`w-full p-3 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        theme === "dark" 
                          ? "bg-gray-700 border-gray-600 text-white" 
                          : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <div className="relative">
                    <select
                      value={priceOrder}
                      onChange={(e) => setPriceOrder(e.target.value)}
                      className={`w-full p-3 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        theme === "dark" 
                          ? "bg-gray-700 border-gray-600 text-white" 
                          : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}
                    >
                      <option value="">Sort by Price</option>
                      <option value="asc">Low to High</option>
                      <option value="desc">High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <div className="relative">
                    <select
                      value={hoursOrder}
                      onChange={(e) => setHoursOrder(e.target.value)}
                      className={`w-full p-3 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        theme === "dark" 
                          ? "bg-gray-700 border-gray-600 text-white" 
                          : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}
                    >
                      <option value="">Sort by Duration</option>
                      <option value="asc">Short to Long</option>
                      <option value="desc">Long to Short</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Course Cards */}
        <AnimatePresence>
          {sortedData.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Try adjusting your search or filters
              </p>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {sortedData.map((course, index) => (
                <motion.div
                  key={course._id}
                  variants={cardVariants}
                  whileHover="hover"
                  layout
                  className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700" 
                      : "bg-white border-gray-100"
                  }`}
                >
                  {/* Thumbnail & Skill Level Badge */}
                  <div className="relative h-48 overflow-hidden group">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <motion.div 
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute top-4 right-4"
                    >
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSkillLevelColor(course.skillLevel)}`}>
                        {course.skillLevel}
                      </span>
                    </motion.div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                      {course.title}
                    </h3>

                    {/* Category */}
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-blue-600">
                        {getCategoryIcon(course.category)}
                      </span>
                      <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                        {course.category}
                      </span>
                    </div>
                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                            {course.totalHours} hours
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                            {course.totalNumberOfLessons} lessons
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">
                          ${course.discountedPrice}
                        </span>
                        {course.discountedPrice < course.price && (
                          <span className={`text-lg line-through ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}>
                            ${course.price}
                          </span>
                        )}
                      </div>
                      {course.discountedPrice < course.price && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                          Save ${course.price - course.discountedPrice}
                        </span>
                      )}
                    </div>

                    {/* Seller */}
                    <div className="flex items-center space-x-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <img
                        src={course.seller.image}
                        alt={course.seller.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{course.seller.name}</p>
                      </div>
                    </div>

                    {/* Rating & Comments */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(4.5)}
                          <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                          (4.5)
                        </span>
                        </div>
                        <span className="font-semibold text-sm">{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                          {course.comments.length}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3 pt-4">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={()=>{navigate(`/coursedetail/${course._id}`) ; scrollTo(0,0) }}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Course</span>
                      </motion.button>
                      <motion.button 
  onClick={() => toggleWishlist(course._id)}
  className={`p-3 rounded-xl border-2 transition-all ${
    wishlist.has(course._id)
      ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
      : theme === "dark"
      ? "border-gray-600 text-gray-400 hover:border-red-400 hover:text-red-400"
      : "border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500"
  }`}
>
  <Heart className={`w-5 h-5 ${wishlist.has(course._id) ? "fill-current" : ""}`} />
</motion.button>

                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiscoverCourses;