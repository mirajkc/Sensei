import React, { useState } from 'react'
import useAppContext from '../context/AppContext'
import { useGoogleLogin } from '@react-oauth/google'
import { toast } from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { theme } = useAppContext()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (coderesponse) => {
      const code = coderesponse.code
      // handle google auth code here
    },
    onError: (error) => toast.error(`Error while Google login: ${error.message}`)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }
    // TODO: Add your login API call here

    toast.success('Login submitted')
    // On successful login, navigate or update context
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 
      ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-slate-800'}`}
    >
      <div
        className={`w-full max-w-md flex flex-col gap-6 rounded-lg p-6 shadow-2xl border 
        ${theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-slate-100 border-slate-300'}`}
      >
        <h1 className="text-2xl font-bold text-center">Welcome to Sensei</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-slate-800 placeholder-slate-500'}`}
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-slate-800 placeholder-slate-500'}`}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-md font-semibold transition 
              ${theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between text-sm">
          <button className="hover:underline" onClick={() => navigate('/home')}>Go to Home</button>
          <button className="hover:underline" onClick={() => navigate('/signup')}>New in Sensei? Sign up</button>
        </div>

        {/* Google Login */}
        <button
          onClick={googleLogin}
          className={`flex items-center justify-center gap-3 px-4 py-2 rounded-md border font-medium
            hover:opacity-90 transition 
            ${theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-gray-200' 
              : 'bg-white border-gray-300 text-slate-800'}`}
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  ) 
}

export default Login
