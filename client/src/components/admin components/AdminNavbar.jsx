import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {LogOut, Home, BadgePlus, Settings } from 'lucide-react'
import useAppContext from '../../context/AppContext'
import toast from 'react-hot-toast'
import nav_logo from '../../assets/navbar_logo.png'
import axios from 'axios'

const AdminNavbar = () => {
  const { theme, isAdmin } = useAppContext()
  const navigate = useNavigate()


  const logoutAdmin = async() => {
    try {
      const {data} = await axios.get('/api/admin/logoutseller')
      if(!data.success){
        return toast.error(data.message)
      }
      toast.success(data.message)
      window.location.pathname = ('/home')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const linkBase =
    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
  const linkHover =
    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'

  return (
    <nav
      className={`sticky top-0 z-50 border-b shadow-sm transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-gray-800 text-gray-200 border-gray-700'
          : 'bg-white text-slate-800 border-gray-200'
      }`}
    >
      <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate('/home')}
          >
            <img
              src={nav_logo}
              alt="Sensei Logo"
              className="h-30 w-auto hover:opacity-80 transition-opacity"
            />
          </div>

          {/* Welcome Message (desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className={`text-lg font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
            }`}>
              Welcome to Admin Dashboard
            </div>
          </div>

          {/* Navigation Links (desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              className={`${linkBase} ${linkHover} flex items-center space-x-2`}
              onClick={logoutAdmin}
            >
              <LogOut className="w-4 h-4" />
              <span>LogOut</span>
            </button>
          </div>
        </div>

        {/* Welcome Message (mobile) */}
        <div className="md:hidden pb-4">
          <div className={`text-center text-lg font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
          }`}>
            Welcome to Admin Dashboard
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar