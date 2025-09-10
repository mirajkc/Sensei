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
import SellerDetail from './pages/SellerDetail'
import EnrolledCourses from './pages/user pages/EnrolledCourses'
import Lesson from './pages/user pages/Lesson'
import Certificate from './components/Certificate'
import SearchPage from './pages/SearchPage'
import CreateBlog from './components/admin components/CreateBlog'
import EditBlog from './components/admin components/EditBlog'
import EditSingleBlog from './components/admin components/EditSingleBlog'
import BlogLanding from './pages/blog page/BlogLanding'
import BlogDetail from './pages/blog page/BlogDetail'
import CommunityLanding from './pages/community_page/CommunityLanding'
import CreatePost from './pages/community_page/CreatePost'
import SinglePost from './pages/community_page/SinglePost'
import EditPage from './pages/community_page/EditPage'

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
        <Route path='/admin/addblog' element={<CreateBlog />} />
        <Route path='/admin/editblogs' element={<EditBlog />} />
        <Route path='/admin/editblog/:blogId' element={<EditSingleBlog />} />


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
        <Route path='/enrolledcourses' element={<EnrolledCourses />} />
        <Route path='/learn/:courseId/:lessonId' element={<Lesson />} />



        //* general dashboard routes
        <Route path='/discovercourses' element = {<DiscoverCourses />} />
        <Route path='/coursedetail/:courseId' element={<CourseDetailsPage />} />
        <Route path='/instructordetails/:sellerId' element={<SellerDetail />} />
        <Route path='/search' element={<SearchPage />} />

        //*certificate generator 
        <Route path='certificate/:courseId' element={<Certificate />} />

        //* all career and roadmaps router
        <Route path='/career&roadmaps' element={<BlogLanding />} />
        <Route path = '/roadmap/:blogId' element={<BlogDetail />} />

        //* all community post routes 
        <Route path='/community' element={<CommunityLanding />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/singlepost/:postId' element={<SinglePost />} />
        <Route path='/editpost/:postId' element={<EditPage/>} />
        

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
