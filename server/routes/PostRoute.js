import express from 'express'
import verifyUser from '../middleware/UserMiddleware.js'
import { checkOwnerShip, commentOnPost, createNewCommunityPost, deleteCommunityPost, dislikeComment, dislikePost, dislikeReply, editCommunityPost, getAllPost, getSinglePostById, likeComment, likePost, likeReply, replyOnComment } from '../controller/PostController.js'
const postRouter = express.Router()

postRouter.post('/createnewblog' , verifyUser , createNewCommunityPost)
postRouter.get('/verifyownership/:postId' , verifyUser , checkOwnerShip)
postRouter.post('/editPost/:postId' , verifyUser , editCommunityPost)
postRouter.delete('/deletepost/:postId' , verifyUser , deleteCommunityPost )
postRouter.get('/getsinglepost/:postId' , getSinglePostById)
postRouter.get('/getallpost' , getAllPost )
postRouter.post('/likepost/:postId' , verifyUser , likePost)
postRouter.post('/dislikepost/:postId' , verifyUser , dislikePost)
postRouter.post('/addcomment/:postId' , verifyUser , commentOnPost)
postRouter.post('/addlikeoncomment/:postId/:commentId' , verifyUser , likeComment )
postRouter.post('/dislikecomment/:postId/:commentId', verifyUser , dislikeComment)
postRouter.post('/replyoncomment/:postId/:commentId' , verifyUser , replyOnComment)
postRouter.post('/likereply/:courseId/:commentId/:replyId', verifyUser , likeReply)
postRouter.post('/dislikereply/:courseId/:commentId/:replyId' , verifyUser , dislikeReply)




export default postRouter 