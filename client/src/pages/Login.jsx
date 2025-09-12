import React, { useState } from 'react'
import useAppContext from '../context/AppContext'
import { GoogleLogin } from '@react-oauth/google'
import { toast } from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const Login = () => { 
  const { theme, authenticateUser } = useAppContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const defaultLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.post('/api/user/logindefault', { email, password }, { withCredentials: true })
      if (!data.success) return toast.error(data.message)

      await authenticateUser() 
      toast.success('Login successful!')
      navigate('/home')
      scrollTo(0, 0)

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }


  const googleLogin = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      toast.error('No Google token received')
      return
    }

    try {
      setLoading(true)
      await axios.post('/api/user/logingoogle', 
        { token: credentialResponse.credential }, 
      )

      await authenticateUser()
      toast.success('Google login successful!')
      navigate('/home')
      scrollTo(0, 0)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Google login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen flex items-center justify-center px-4 
        ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-slate-800'}`}
    >
      <div className={`w-full max-w-md flex flex-col gap-6 rounded-lg p-6 shadow-2xl border 
        ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-slate-300'}`}
      >
        <h1 className="text-2xl font-bold text-center">Welcome to Sensei</h1>

        <form onSubmit={defaultLogin} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' : 
                'bg-white border-gray-300 text-slate-800 placeholder-slate-500'}`}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' :
                'bg-white border-gray-300 text-slate-800 placeholder-slate-500'}`}
              required
            />
          </div>

          <button type="submit" className={`w-full py-2 rounded-md font-semibold transition
            ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            Login
          </button>
        </form>

        <div className="flex justify-between text-sm">
          <button className="text-blue-400 hover:underline" onClick={() => navigate('/home')}>Go to Home</button>
          <button className="text-blue-400 hover:underline" onClick={() => navigate('/signup')}>New in Sensei? Sign up</button>
        </div>

        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={googleLogin}
            onError={() => toast.error('Google login failed')}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Login
