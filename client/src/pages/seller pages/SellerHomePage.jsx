import React from "react";
import SellerNavbar from "../../components/seller components/SellerNavbar";
import SellerSidebar from "../../components/seller components/SellerSidebar";

const SellerHomePage = () => {
  return (
    <div className="flex flex-col h-screen">
    
      <SellerNavbar />

     
      <div className="flex flex-1">
       
        <SellerSidebar />

       
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h2 className="text-2xl font-semibold">Seller Dashboard</h2>
          <p className="mt-4 text-gray-700">
            Welcome to your seller dashboard! Here you can manage products,
            view orders, and track performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerHomePage;
