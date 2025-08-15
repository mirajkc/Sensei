import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const naviagate = useNavigate()
  const location = useLocation()


  if (location.pathname==='/login') return null;
  if(location.pathname === '/signup') return null;
  return (
    <div className='flex items-center py-2 ' >
      <div className='ml-auto' >
        <button className='px-8 py-1 mr-4 bg-gray-600 rounded cursor-pointer text-white hover:scale-110 transition-transform duration-300 ease-in-out' onClick={()=>naviagate('/login')} >Login</button>
      </div>
    </div>
  )
}

export default Navbar
