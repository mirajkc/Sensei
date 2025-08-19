import express from 'express'
import multer from 'multer'
import verifySeller from '../middleware/SellerMiddleware.js'
import { addCourse, addNewLesson, deleteCourseById, getAllCourseForOneSeller, getAllLessonByCourseIdForSeller, getCourseById, updateCourse } from '../controller/CourseController.js'



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

export default courseRouter
 