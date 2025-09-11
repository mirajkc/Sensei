import express from 'express'
import {  defaultServerLogin, defaultServerSignUP, getCourseEnrollmentCount, getDetailsForCertificate, getEnrolledCourses, getSingleEnrolledCourseDetails, getStudentDetails, GoogleSignIn, greetUser, loginWithGoogle, progressTracker, updateStudentDetails, userLogOut } from '../controller/UserController.js'
import multer from 'multer'
import verifyUser from '../middleware/UserMiddleware.js'


const upload = multer({ dest: 'uploads/' }) 
const userRouter = express.Router()

//* Sign in user using Google
userRouter.post('/signingoogle', GoogleSignIn)

//* Sign in using default server login
//* Multer expects field name "image"
userRouter.post('/signindefault', upload.single('image'), defaultServerSignUP)
userRouter.post('/logingoogle' , loginWithGoogle )
userRouter.post('/logindefault' , defaultServerLogin )
userRouter.get('/logoutuser' , verifyUser , userLogOut )
userRouter.get('/detailsbyid' , verifyUser , getStudentDetails )
userRouter.post('/updateuserbyid' , verifyUser  , upload.single('image') , updateStudentDetails )
userRouter.get('/getenrolledcourses', verifyUser , getEnrolledCourses)
userRouter.get('/getenrollmentcount/:courseId' , getCourseEnrollmentCount)
userRouter.get('/getsingleenrollmentcourse/:courseId', verifyUser , getSingleEnrolledCourseDetails)
userRouter.get('/trackuserprogress/:courseId/:lessonId' ,verifyUser , progressTracker )
userRouter.get('/getdetailsforcertificate/:courseId' , verifyUser , getDetailsForCertificate)
userRouter.get('/getuserdataforhome' , verifyUser , greetUser)
userRouter.get( '/verifyUser' , verifyUser , (req,res)=>{
  res.status(200).json({
    success : true,
    user : {
      id : req.user._id,
      name : req.user.name,
      email : req.user.email,
      picture : req.user.picture
    }
  })
})

export default userRouter
