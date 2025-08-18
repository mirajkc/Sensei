import express from 'express'
import multer from 'multer'
import verifySeller from '../middleware/SellerMiddleware.js'
import { addCourse } from '../controller/AddCourse.js'


const upload = multer({dest : 'uploads/'})
const courseRouter = express.Router()

//*add a new course  (api/course/addcourse)
courseRouter.post('/addcourse', verifySeller, upload.single('image') , addCourse)

export default courseRouter
 