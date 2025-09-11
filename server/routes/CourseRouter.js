import express from 'express'
import multer from 'multer'
import verifySeller from '../middleware/SellerMiddleware.js'
import { addCourse, addNewLesson, deleteCourseById, deleteLessonById, editLessonById, getAllCourseForOneSeller, getAllCourseForUI, getAllLessonByCourseIdForSeller, getCourseById, getLessonDetailById, getSingleCourseforUI, searchForCourse, updateCourse } from '../controller/CourseController.js'



const upload = multer({dest : 'uploads/'})
const courseRouter = express.Router()

//*add a new course  (api/course/addcourse)
courseRouter.post('/addcourse', verifySeller, upload.single('image') , addCourse)
courseRouter.get('/getcoursebyid/:courseId' , verifySeller , getCourseById )
courseRouter.post('/updatecourse/:courseId', verifySeller , upload.single('thumbnail') , updateCourse )
courseRouter.get('/getcoursebysellerid', verifySeller , getAllCourseForOneSeller) 
courseRouter.delete('/deletecourse/:courseId' ,  verifySeller , deleteCourseById )
courseRouter.post('/addnewlesson/:courseId' , verifySeller , addNewLesson )
courseRouter.get('/getalllesson/manage/:courseId', verifySeller , getAllLessonByCourseIdForSeller)
courseRouter.get('/getcourse/:courseId/getlesson/:lessonId', getLessonDetailById)
courseRouter.post('/editcourse/:courseId/editlesson/:lessonId' , verifySeller , editLessonById )
courseRouter.delete('/deletelesson/:courseId/:lessonId' , verifySeller , deleteLessonById )
courseRouter.get('/getAllCourseForUI' , getAllCourseForUI  )
courseRouter.get('/getsinglecourseforui/:courseId', getSingleCourseforUI)
courseRouter.get('/search' , searchForCourse)


export default courseRouter
 