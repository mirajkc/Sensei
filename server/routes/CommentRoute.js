import express from 'express'
import verifyUser from '../middleware/UserMiddleware.js'
import { addNewComment, getAllCommentByCourseId } from '../controller/CommentController.js'

const commentRouter = express.Router()


commentRouter.post('/addnewcomment/:courseId' ,verifyUser , addNewComment)
commentRouter.get('/getallcomment/:courseId' , getAllCommentByCourseId)

export default commentRouter