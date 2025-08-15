import React from 'react'
import { FcGoogle } from "react-icons/fc"
import useAppContext from '../context/AppContext'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const SignUp = () => {
  const { theme } = useAppContext()
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (coderesponse) => {
      const code = coderesponse.code
      // handle google login success here
    },
    onError: (error) => toast.error(`Error while Google login: ${error.message}`)
  })

  return (
    <div
      className={`flex min-h-screen w-full items-center justify-center px-4
        ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}
    >
      <form
        className={`w-full max-w-md space-y-6 rounded-lg p-8 shadow-2xl
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-slate-100'}`}
      >
        <h2 className="text-center text-3xl font-bold mb-6">Create your Sensei Account</h2>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="profilePic">
            Profile Picture
          </label>
          <input
            id="profilePic"
            type="file"
            accept='image/*'
            required
            className={`rounded-md border px-3 py-2
              ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="email">
            Gmail
          </label>
          <input
            id="email"
            type="email"
            placeholder="eg: hello@gmail.com"
            required
            className={`rounded-md border px-3 py-2 placeholder-gray-400
              ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="eg: Tom"
            required
            className={`rounded-md border px-3 py-2
              ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="eg: ********"
            required
            className={`rounded-md border px-3 py-2
              ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="eg: ********"
            required
            className={`rounded-md border px-3 py-2
              ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>

        <button
          type="submit"
          className={`w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          Submit
        </button>

        <div className="text-center text-gray-500">or</div>

        <button
          type="button"
          onClick={googleLogin}
          className={`flex w-full items-center justify-center gap-3 rounded-md border px-4 py-2 font-medium
            transition hover:opacity-90
            ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`}
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>

        <p
          className={`mt-6 text-center text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          Already signed up?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-semibold text-blue-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp
