import express from 'express'
const blogRouter = express.Router()
import multer from 'multer'
import verifyAdmin from '../middleware/AdminMiddleware.js'
import { addNewComment, createNewBlog, deleteBlogById, dislikeTheBlog, getAllBlogs, getSingleBlogById, likeTheBlog, updateBlog } from '../controller/BlogController.js'
import verifyUser from '../middleware/UserMiddleware.js'
const upload = multer({ dest: 'uploads/' })

blogRouter.post('/createblog' , verifyAdmin, upload.single('thumbnail') , createNewBlog)
blogRouter.get('/getallblog' ,getAllBlogs )
blogRouter.get('/getsingleblog/:blogId' , getSingleBlogById)
blogRouter.post('/updateblog/:blogId' , verifyAdmin , upload.single('thumbnail') , updateBlog)
blogRouter.delete('/deleteblog/:blogId' , verifyAdmin , deleteBlogById)
blogRouter.post('/addnewcomment/:blogId' , verifyUser , addNewComment)
blogRouter.post('/likeblog/:blogId' , verifyUser , likeTheBlog)
blogRouter.post('/dislikeblog/:blogId' , verifyUser , dislikeTheBlog)

export default blogRouter