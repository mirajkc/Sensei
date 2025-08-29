import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ThemeSwitch from './components/ThemeSwitch'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import  { Toaster } from 'react-hot-toast'
import SellerHomePage from './pages/seller pages/SellerHomePage'
import SellerSignUp from './pages/seller pages/SellerSignUp'
import SellerLogin from './pages/seller pages/SellerLogin'
import AdminHome from './pages/admin pages/AdminHome'
import AdminLogin from './components/admin components/AdminLogin'
import useAppContext from './context/AppContext'
import AddNewCourse from './pages/seller pages/AddNewCourse'
import EditCourse from './pages/seller pages/EditCourse'
import AllCourse from './pages/seller pages/AllCourse'
import EditLesson from './pages/seller pages/EditLesson'
import SellerSetting from './pages/seller pages/SellerSetting'
import Footer from './components/Footer'
import DiscoverCourses from './pages/DiscoverCourses'
import UserProfile from './pages/user pages/UserProfile'
import WishList from './pages/user pages/wishlist'
import CourseDetailsPage from './pages/CourseDetailsPage'
import Cart from './pages/user pages/Cart'

const App = () => {
  const { isAdmin,sellerLoggedIn } = useAppContext()
  
  return  (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/signup' element={ <SignUp /> } />
        <Route path='/login' element={<Login />} />

        //* all admin routes 
        <Route path='/admin' element={ isAdmin ? <AdminHome /> : <AdminLogin /> }/>

        //* all seller routes 
        <Route path='/seller' element={   sellerLoggedIn ?   <SellerHomePage /> : <SellerLogin /> } />
        <Route path='/seller/signup'  element={ <SellerSignUp />} />
        <Route path='/seller/login' element={ <SellerLogin /> } />
        <Route path='/seller/addcourse' element={ <AddNewCourse /> } />
        <Route path='/seller/editcourse/:courseId' element={ <EditCourse /> } />
        <Route path='/seller/allcourse' element={<AllCourse />} />
        <Route path='/seller/editcourse/:courseId/editlesson/:lessonId' element={<EditLesson />} />
        <Route path='/seller/settings' element={<SellerSetting />} />

        //* all user routes
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/wishlists' element={<WishList />} />
        <Route path='/cart' element={<Cart />} />



        //* general dashboard routes
        <Route path='/discovercourses' element = {<DiscoverCourses />} />
        <Route path='/coursedetail/:courseId' element={<CourseDetailsPage />} />
        

      </Routes>
      <Footer />
      <ThemeSwitch/>
      <Toaster
             position="top-right"
             reverseOrder={false}
      />
      

    </div>
  )
}

export default App
