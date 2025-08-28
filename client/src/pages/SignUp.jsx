import React, { useState } from 'react';
import useAppContext from '../context/AppContext';
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';         
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {motion} from 'framer-motion'

const SignUp = () => {
  const { theme } = useAppContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const googleSignup = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const code = codeResponse?.code;
      if (!code) {
        toast.error('Google auth code missing. Please try again.');
        return;
      }
      try {
        setLoading(true);
        const { data } = await axios.post(
          '/api/user/signingoogle',
          { code }
        );

        if (!data?.success) {
          toast.error(data?.message || 'Google signup failed.');
          return;
        }
        window.location.href = '/home';
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message || 'Google signup error.');
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => toast.error(`Error during Google signup${error?.message ? `: ${error.message}` : ''}`)
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setProfilePicture(file);
    }
  };

  const defaultSignup = async (e) => {
    e.preventDefault();

    if (loading) return; 

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password;
    const trimmedPassword2 = password2;

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedPassword2) {
      toast.error('All fields are required');
      return;
    }

    if (trimmedPassword !== trimmedPassword2) {
      toast.error('Passwords do not match');
      return;
    }

    if (!profilePicture) {
      toast.error('Profile picture is required');
      return;
    }

    try {
      setLoading(true);

      
      const formData = new FormData();
      formData.append('name', trimmedName);
      formData.append('email', trimmedEmail);
      formData.append('password', trimmedPassword);
      formData.append('password2', trimmedPassword2);
      formData.append('image', profilePicture);

      const { data } = await axios.post(
        '/api/user/signindefault',
        formData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!data?.success) {
        toast.error(data?.message || 'Signup failed.');
        return;
      }
      
      toast.success('Account created successfully!');
      window.location.href = '/home';
    
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || 'Signup error.');
    } finally {
      setLoading(false);  
    }
  };

  return (
    <motion.div
      initial={{opacity : 0 , y : 100}}
      animate = {{ opacity : 1 , y : 0 }}
      transition={{duration : 0.8}}
      className={`min-h-screen flex items-center justify-center px-4 py-8
      ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-slate-800'}`}
    >
      <div
        className={`w-full max-w-md flex flex-col gap-6 rounded-lg p-6 shadow-2xl border 
        ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-slate-300'}`}
      >
        <h1 className="text-2xl font-bold text-center">Join Sensei</h1>

        <form onSubmit={defaultSignup} className="flex flex-col gap-4" aria-busy={loading}>
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="name">Full Name</label>
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
            <label className="font-medium" htmlFor="email">Email</label>
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
            <label className="font-medium" htmlFor="password2">Confirm Password</label>
            <input
              id="password2"
              name="password2"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
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

          {/* Profile Picture Field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="profilePicture">Profile Picture</label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white file:cursor-pointer file:hover:bg-blue-700' 
                  : 'bg-white border-gray-300 text-slate-800 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white file:cursor-pointer file:hover:bg-blue-600'}`}
              required
            />
            {profilePicture && (
              <span className="text-sm text-green-600">
                Selected: {profilePicture.name}
              </span>
            )}
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
            {loading ? 'Creating Account…' : 'Sign Up'}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between text-sm">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => navigate('/home')}
            disabled={loading}
          >
            Go to Home
          </button>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => navigate('/login')}
            disabled={loading}
          >
            Already have an account? Login
          </button>
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={googleSignup}
          disabled={loading}
          className={`flex items-center justify-center gap-3 px-4 py-2 rounded-md border font-medium
            hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed
            ${theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-gray-200' 
              : 'bg-white border-gray-300 text-slate-800'}`}
        >
          <FcGoogle className="text-xl" />
          {loading ? 'Please wait…' : 'Sign up with Google'}
        </button>
      </div>
    </motion.div>
  );
};

export default SignUp;