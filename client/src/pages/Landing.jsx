import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className='fixed inset-0 flex justify-center' >
      <button onClick={()=>navigate('/home')} >Go To Home</button>
    </div>
  )
}

export default Landing
