import React, { useState } from "react";
import { motion } from "framer-motion";
import useAppContext from "../../context/AppContext";
import { Home, GraduationCap, UsersRound, BookPlus, Menu, X, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Dashboard", icon: <Home size={20} />, route: "/seller" },
  { name: "Courses", icon: <GraduationCap size={20} />, route: "/course" },
  { name: "Enrolled Students", icon: <UsersRound size={20} />, route: "/students" },
  { name: "Add New Course", icon: <BookPlus size={20} />, route: "/add-course" },
  { name: "Settings", icon: <Settings size={20} />, route: "/settings" },
];

const SellerSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useAppContext();

  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
      animate={{ width: isOpen ? "250px" : "70px" }}
      className={`h-screen flex flex-col shadow-lg transition-colors duration-300
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}
      `}
    >
      {/* Top Section */}
      <div
        className={`flex items-center justify-between p-4 border-b
          ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
        `}
      >
        {isOpen && <h1 className="text-lg font-bold">Welcome back, Seller</h1>}
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4">
        {categories.map((item, i) => (
          <motion.div
            key={i}
            onClick={() => navigate(item.route)}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md
              ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}
            `}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};

export default SellerSidebar;
