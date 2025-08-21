import React, { useState } from "react";
import SellerNavbar from "../../components/seller components/SellerNavbar";
import SellerSidebar from "../../components/seller components/SellerSidebar";

const SellerHomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  

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
            <p>total course created</p>
            <p>total students enrolled</p>
            <p>total revenue</p>
            <p>average course rating</p>
            <p>quick action links</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHomePage;