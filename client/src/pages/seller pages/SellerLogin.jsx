import React, { useState } from 'react'
import useAppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const SellerLogin = () => {
  const { theme } = useAppContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const sellerLogin = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const {data} = await axios.post('/api/seller/login' , { email , password })
      if(!data.success){
        toast.error(data.message)
      }
      window.location.pathname = '/seller'
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 
      ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-slate-800'}`}
    >
      <div
        className={`w-full max-w-md flex flex-col gap-6 rounded-lg p-6 shadow-2xl border 
        ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-slate-300'}`}
      >
        <h1 className="text-2xl font-bold text-center">Seller Login</h1>

        <form className="flex flex-col gap-4" aria-busy={loading} onSubmit={sellerLogin} >
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="email">Please enter email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              disabled={loading}
              className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-slate-800 placeholder-slate-500'}`}
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="password">Please enter password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
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
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed
              ${theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            {loading ? 'Logging in…' : 'Login as Seller'}
          </button>

          {/* Navigation Links */}
          <div className="flex justify-between text-sm">
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => navigate('/home')}
              disabled={loading}
            >
              Go to home
            </button>
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => navigate('/seller/signup')}
              disabled={loading}
            >
              Not signed up? Sign up here
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SellerLogin