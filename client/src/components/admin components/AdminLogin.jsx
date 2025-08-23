import React, { useState } from 'react'
import useAppContext from '../../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminLogin = () => {
  const { theme } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const verifyUser = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post('/api/admin/login', { email, password })
      if (!data.success) return toast.error(data?.message || 'Login failed')
      toast.success(data.message)
      window.location.pathname = '/admin'
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      <div className="w-full max-w-md">
        <form
          onSubmit={verifyUser}
          className={`relative w-full p-6 sm:p-8 lg:p-10 rounded-2xl border backdrop-blur-sm shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.01] ${theme === 'dark' ? 'bg-gray-800/95 border-gray-700/50 text-gray-200 shadow-black/50' : 'bg-white/95 border-gray-200/50 text-gray-800 shadow-gray-900/20'}`}
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-600/20 ring-2 ring-blue-600/30' : 'bg-blue-100 ring-2 ring-blue-200'}`}>
              <svg className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold mb-2 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Admin Portal
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Sign in to access admin dashboard
            </p>
          </div>

          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label 
                htmlFor="email"
                className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Email Address
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="Enter your email address"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-500 focus:bg-gray-700' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'}`}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label 
                htmlFor="password"
                className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Password
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-500 focus:bg-gray-700' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'}`}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white shadow-lg hover:shadow-xl focus:ring-offset-gray-800' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg hover:shadow-xl focus:ring-offset-white'}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In to Admin Panel
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-opacity-20 text-center">
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-500 border-gray-600' : 'text-gray-500 border-gray-200'}`}>
              Secure admin access · Protected by encryption
            </p>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className={`absolute inset-0 rounded-2xl flex items-center justify-center backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
              <div className="flex items-center space-x-2">
                <div className={`animate-spin rounded-full h-6 w-6 border-2 border-t-transparent ${theme === 'dark' ? 'border-blue-400' : 'border-blue-600'}`}></div>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Authenticating...
                </span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default AdminLogin