import React from 'react'
import useAppContext from '../context/AppContext'

const HomePage = () => {
  const {theme} = useAppContext()

  return (
    <div className={` ${ theme === 'dark'? 'bg-gray-900 text-white' : 'bg-gray-200 text-black ' } `} >
      This is a home page
    </div>
  )
}

export default HomePage
