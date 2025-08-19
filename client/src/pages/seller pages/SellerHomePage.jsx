import React, { useState } from "react";
import SellerNavbar from "../../components/seller components/SellerNavbar";
import SellerSidebar from "../../components/seller components/SellerSidebar";

const SellerHomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const code = `import mongoose from 'mongoose';

//* Lesson sub-schema
const lessonSchema = new mongoose.Schema({ 
  lessonNumber: { type: Number },
  title: { type: String, required: true },
  description: { type: String, required: true },
  whatYouWillLearn: { type: String, required: true },
  lessonDuration: { type: Number, required: true },
  textGuide: { type: String, required: true },
  videoGuide: { type: String } //* optional
});

//* Course schema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      "Web Development",
      "Digital Marketing",
      "Data Science",
      "Front End Development",
      "Back End Development",
      "Others"
    ]
  },
  thumbnail: { type: String, required: true },
  trailer: { type: String, required: true },
  description: { type: String, required: true },
  lessons: [lessonSchema],
  price: { type: Number, required: true },
  discountedPrice : {type : Number , required : true},
  totalHours: { type: Number, default: 0 },
  totalNumberOfLessons: { type: Number, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

//* Middleware to auto-calculate fields
courseSchema.pre("save", function(next) {
  this.totalHours = this.lessons.reduce((sum, lesson) => sum + lesson.lessonDuration, 0);
  this.totalNumberOfLessons = this.lessons.length;
  this.updatedAt = new Date();
  this.lessons.forEach((lesson, index) => {
    lesson.lessonNumber = index + 1; 
  });
  next();
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;`;

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Navbar */} 
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <SellerNavbar />
      </div>
      
      {/* Main layout */}
      <div className="flex flex-1 pt-16">
        {/* Fixed Sidebar */}
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
        
        {/* Main content */}
        <div 
          className={`flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300 ${
            sidebarOpen ? 'ml-[250px]' : 'ml-[70px]'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Seller Dashboard</h2>
            
            {/* Code display card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Course Schema Model</h3>
              </div>
              <div className="p-4">
                <pre className="text-sm overflow-x-auto bg-gray-900 text-green-400 p-4 rounded-md">
                  <code>{code}</code>
                </pre>
              </div>
            </div>
            
            {/* Additional dashboard content can go here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Courses</h3>
                <p className="text-3xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Enrolled Students</h3>
                <p className="text-3xl font-bold text-green-600">248</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-purple-600">$12,450</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHomePage;