import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ThemeSwitch from './components/ThemeSwitch'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import Login from './pages/Login'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ThemeSwitch/>

    </div>
  )
}

export default App
