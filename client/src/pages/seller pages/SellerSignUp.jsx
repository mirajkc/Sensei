import React, { useState } from 'react'
import useAppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const SellerSignUp = () => {
  const { theme } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()


  const signinSeller = async (e) => {
  e.preventDefault(); 
  try {
    setLoading(true);

    if (!image) {
      alert("Please select a profile picture");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password1", password1);

    const { data } = await axios.post('/api/seller/sellersignup', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if(!data.success){
      return toast.error(data.message)
    }
    window.location.pathname = '/seller'
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8
      ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-slate-800'}`}
    >
      <div
        className={`w-full max-w-md flex flex-col gap-6 rounded-lg p-6 shadow-2xl border 
        ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-slate-300'}`}
      >
        <h1 className="text-2xl font-bold text-center">Become a Seller</h1>

        <form onSubmit={signinSeller} className="flex flex-col gap-4" aria-busy={loading}>
          {/* Profile Picture Field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="profilePicture">Enter your profile picture</label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={(e) => setImage(e.target.files[0])}
              className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white file:cursor-pointer file:hover:bg-blue-700' 
                  : 'bg-white border-gray-300 text-slate-800 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white file:cursor-pointer file:hover:bg-blue-600'}`}
              required
            />
          </div>

          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              disabled={loading}
              className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-slate-800 placeholder-slate-500'}`}
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="email">Gmail</label>
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
            <label className="font-medium" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
              disabled={loading}
              className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-slate-800 placeholder-slate-500'}`}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="password1">Confirm Password</label>
            <input
              id="password1"
              name="password1"
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              placeholder="Confirm your password"
              autoComplete="new-password"
              disabled={loading}
              className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-slate-800 placeholder-slate-500'}`}
              required
            />
          </div>
          <div className='flex items-center my-4 w-auto gap-6'>
  <div onClick={() => navigate('/home')}>
    <p className='text-blue-400 underline hover:text-blue-700 cursor-pointer'>Go to home</p>
  </div>
  <div onClick={() => navigate('/seller/login')}>
    <p className='text-blue-400 underline hover:text-blue-700 cursor-pointer'>Already signed up? Login here</p>
  </div>
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
            {loading ? 'Creating Account…' : 'Sign Up as Seller'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SellerSignUp