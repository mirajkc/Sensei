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
    <div className={`flex justify-center items-center min-h-screen px-4 py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <form
        onSubmit={verifyUser}
        className={`
          w-full max-w-md mx-auto p-8 rounded-2xl border backdrop-blur-sm
          shadow-xl transition-all duration-300 ease-in-out
          ${theme === 'dark'
            ? 'bg-gray-800/90 border-gray-700/50 text-gray-200 shadow-black/30'
            : 'bg-white/90 border-gray-200/50 text-gray-700 shadow-gray-900/10'}
          hover:shadow-2xl transform hover:scale-[1.02]
          sm:p-10 lg:p-12
        `}
      >
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-2 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Welcome Back
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign in to your admin account
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className={`
              relative flex items-center border rounded-lg transition-all duration-200
              ${theme === 'dark'
                ? 'bg-gray-700/50 border-gray-600 focus-within:border-indigo-500 focus-within:bg-gray-700'
                : 'bg-gray-50 border-gray-300 focus-within:border-indigo-500 focus-within:bg-white'}
              focus-within:ring-2 focus-within:ring-indigo-500/20
            `}>
              <div className="pl-3 flex items-center">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} strokeOpacity=".7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} strokeOpacity=".7" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                className={`w-full py-3 px-3 bg-transparent outline-none text-sm placeholder:transition-colors duration-200 ${theme === 'dark' ? 'text-gray-200 placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-500'}`}
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className={`
              relative flex items-center border rounded-lg transition-all duration-200
              ${theme === 'dark'
                ? 'bg-gray-700/50 border-gray-600 focus-within:border-indigo-500 focus-within:bg-gray-700'
                : 'bg-gray-50 border-gray-300 focus-within:border-indigo-500 focus-within:bg-white'}
              focus-within:ring-2 focus-within:ring-indigo-500/20
            `}>
              <div className="pl-3 flex items-center">
                <svg width="16" height="18" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'}/>
                </svg>
              </div>
              <input
                className={`w-full py-3 px-3 bg-transparent outline-none text-sm placeholder:transition-colors duration-200 ${theme === 'dark' ? 'text-gray-200 placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-500'}`}
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-3 px-4 rounded-lg font-semibold text-sm
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-4 focus:ring-indigo-500/30
              transform active:scale-95
              ${theme === 'dark'
                ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-lg hover:shadow-xl'
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-lg hover:shadow-xl'}
            `}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminLogin
