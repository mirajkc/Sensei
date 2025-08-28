import React, { useState } from 'react'
import useAppContext from '../context/AppContext'
import { useGoogleLogin } from '@react-oauth/google'
import { toast } from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {motion} from 'framer-motion'

const Login = () => {
  const { theme } = useAppContext()
  const navigate = useNavigate()
  const[loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const googleLogin = useGoogleLogin({
  flow: 'auth-code',
  onSuccess: async (coderesponse) => {
    const code = coderesponse.code;
    if (code) {
      try {
        setLoading(true);
        const { data } = await axios.post('/api/user/logingoogle', { code });
        if (!data.success) return toast.error(data.message);
        window.location.href = '/home'
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  },
  onError: (error) => toast.error(`Error while Google login: ${error.message}`)
});


  const defaultLogin = async(e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }

    try {
      setLoading(true)
      const {data} = await axios.post( '/api/user/logindefault' , { email , password }  )
      if(!data.success){
        return toast.error( data.message )
      }else{
        if(data.success){
          window.location.href = '/home'
        }
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(fasle)
    }
  }

  return (
    <motion.div
       initial={{opacity : 0 ,  y : 100}}
       animate ={ {opacity : 1 , y : 0}}
       transition={{duration : 0.8}}
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

        <form onSubmit={defaultLogin} className="flex flex-col gap-4">
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
          <button className=" text-blue-400 hover:underline  " onClick={() => navigate('/home')}>Go to Home</button>
          <button className=" text-blue-400 hover:underline" onClick={() => navigate('/signup')}>New in Sensei? Sign up</button>
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
          Login with Google
        </button>
      </div>
    </motion.div>
  ) 
}

export default Login
