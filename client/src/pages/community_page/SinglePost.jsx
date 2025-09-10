import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Reply, Edit, Trash2, Send, ThumbsUp, ThumbsDown } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAppContext from '../../context/AppContext.jsx'
import { useParams, useNavigate } from 'react-router-dom'

const SinglePost = () => {
  const { theme, loggedIn, user } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [postData, setPostData] = useState(null)
  const [isPostAuthor , setIsPostAuthor] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [replyTexts, setReplyTexts] = useState({})
  const [showReplyBox, setShowReplyBox] = useState({})
  const [submittingComment, setSubmittingComment] = useState(false)
  const [submittingReply, setSubmittingReply] = useState({})
  const { postId } = useParams()
  const navigate = useNavigate()

 
  //* checkf is the user is the owner of the post or not
  const checkOwnerShip = async() => {
    try {
      setLoading(true)
      const {data} = await axios.get(`/api/post/verifyownership/${postId}`)
      if(!data.success){
        console.log(data.message);
      }
      setIsPostAuthor(data.isOwner)
      
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  //* get the comment details
  const getSinglePostDetails = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/post/getsinglepost/${postId}`)
      if (!data.success) {
        return toast.error(data.message)
      }
      setPostData(data.post)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  //* like the post
  const handlePostLike = async () => {
    if (!loggedIn){
      navigate('/login')
      scrollTo(0,0)
    }

    try {
      setLoading(true)
      const {data} = await axios.post(`/api/post/likepost/${postId}`)
      if(!data.success){
        return toast.error(data.message)
      }
      toast.success(data.message)
      getSinglePostDetails()
      
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  //* dislike the post
  const handlePostDislike = async () => {
    if (!loggedIn){
      navigate('/login')
      scrollTo(0,0)
    }
    try {
      setLoading(true)
      const {data} = await axios.post(`/api/post/dislikepost/${postId}`)
      if(!data.success){
        return toast.error(data.message)
      }
      toast.success(data.message)
      getSinglePostDetails()
      
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }


  //* submit the post comment 
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!loggedIn){
      navigate('/login')
      scrollTo(0,0)
    }
    try {
      setSubmittingComment(true)
      const { data } = await axios.post(`/api/post/addcomment/${postId}`, {
        comments: newComment
      })
      if (!data.success) {
       return toast.error(data.message)
      }
      toast.success(data.message)
      getSinglePostDetails()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmittingComment(false)
    }
  }

  //* like a comment
  const handleCommentLike = async (commentId) => {
    if (!loggedIn){
      navigate('/login')
      scrollTo(0,0)
    }
    try {
      const { data } = await axios.post(`/api/post/addlikeoncomment/${postId}/${commentId}`)
      if (!data.success) {
        toast.error(data.message)
      }
      toast.success(data.message)
      getSinglePostDetails()
    } catch (error) {
      toast.error(error.message)
    }
  }

  //* dislike the comment
  const handleCommentDislike = async (commentId) => {
    if (!loggedIn){
      navigate('/login')
      scrollTo(0,0)
    }
    try {
      const { data } = await axios.post(`/api/post/dislikecomment/${postId}/${commentId}`)
      if (data.success) {
        toast.success(data.message)
       getSinglePostDetails()
       return
      }
      if(!data.success){
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //* reply on comment 
  const handleReplySubmit = async (commentId) => {
    if (!loggedIn){
      navigate('/login')
      scrollTo(0,0)
    }
    const replyText = replyTexts[commentId]

    try {
      setSubmittingReply(prev => ({ ...prev, [commentId]: true }))
      const { data } = await axios.post(`/api/post/replyoncomment/${postId}/${commentId}`, {
        reply: replyText
      })
      if (data.success) {
        toast.success(data.message)
        getSinglePostDetails()
        setReplyTexts("")
        return
      }

      if(!data.success){
        return toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmittingReply(prev => ({ ...prev, [commentId]: false }))
    }
  }

  //* like the reply 
  const handleReplyLike = async (commentId, replyId) => {
    if (!loggedIn){
      toast.success(data.message)
      navigate(0,0)
      return
    }
    try {
      const { data } = await axios.post(`/api/post/likereply/${postId}/${commentId}/${replyId}`)
      if (!data.success) {
        toast.error(data.message)
      }

      if(data.success){
        toast.success(data.message)
        getSinglePostDetails()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //* dislike the reply 
  const handleReplyDislike = async (commentId, replyId) => {
    if (!loggedIn){
      navigate('/login')
      scrollTo(0,0)
    }
    try {
      const { data } = await axios.post(`/api/post/dislikereply/${postId}/${commentId}/${replyId}`)
      if (!data.success) {
        return toast.error(data.message)
      }

      if(data.success){
        toast.success(data.message)
        getSinglePostDetails()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleEditPost = () => {
    navigate(`/editpost/${postId}`)
  }

  //* delete post
  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const { data } = await axios.delete(`/api/post/deletepost/${postId}`)
        if (data.success) {
          toast.success('Post deleted successfully')
          navigate('/community')
        }
      } catch (error) {
        toast.error('Failed to delete post')
      }
    }
  }

  useEffect(() => {
    getSinglePostDetails(),
    checkOwnerShip()
  }, [postId])

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`w-8 h-8 border-2 border-t-transparent rounded-full ${theme === 'dark' ? 'border-blue-400' : 'border-blue-600'}`}
        />
      </div>
    )
  }

  if (!postData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <p>Post not found</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Post Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-lg p-6 mb-6 shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        >
          {/* Post Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}>
                <img className='rounded-full' src={postData.user.picture} alt="" />
              </div>
              <div>
                <p className="font-medium">{postData.user?.name}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(postData.createdAt).toLocaleDateString()}
                  {postData.edited && <span className="ml-2">(edited)</span>}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
              {postData.tags}
            </span>
          </div>

          {/* Post Content */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{postData.title}</h1>
          <p className={`text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {postData.content}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePostLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                postData.likes?.some(like => like.user === user?._id)
                  ? 'bg-green-500 text-white'
                  : theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{postData.likes?.length || 0}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePostDislike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                postData.dislikes?.some(dislike => dislike.user === user?._id)
                  ? 'bg-red-500 text-white'
                  : theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{postData.dislikes?.length || 0}</span>
            </motion.button>

            <div className={`flex items-center gap-2 px-4 py-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <MessageCircle className="w-4 h-4" />
              <span>{postData.comments?.length || 0} comments</span>
            </div>
          </div>

          {/* Edit/Delete Buttons for Post Author */}
          {isPostAuthor && (
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditPost}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
              >
                <Edit className="w-4 h-4" />
                Edit Post
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeletePost}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
              >
                <Trash2 className="w-4 h-4" />
                Delete Post
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Comment Form */}
        {loggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-lg p-6 mb-6 shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          >
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                className={`w-full p-3 rounded-lg border resize-none ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submittingComment}
                className={`mt-3 flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white disabled:bg-gray-600'
                    : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400'
                }`}
              >
                <Send className="w-4 h-4" />
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Comments */}
        <AnimatePresence>
          {postData.comments?.map((comment, index) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`rounded-lg p-6 mb-4 shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            >
              {/* Comment Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-green-600' : 'bg-green-500'}`}>
                  <img className='rounded-full'  src={comment?.user?.picture} alt="" />
                </div>
                <div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {comment.user?.name}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Comment Content */}
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {comment.comment}
              </p>

              {/* Comment Actions */}
              <div className="flex items-center gap-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCommentLike(comment._id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    comment.likes?.some(like => like.user === user?._id)
                      ? 'text-green-500'
                      : theme === 'dark' ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-500'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{comment.likes?.length || 0}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCommentDislike(comment._id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    comment.dislikes?.some(dislike => dislike.user === user?._id)
                      ? 'text-red-500'
                      : theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>{comment.dislikes?.length || 0}</span>
                </motion.button>

                {loggedIn && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReplyBox(prev => ({ ...prev, [comment._id]: !prev[comment._id] }))}
                    className={`flex items-center gap-1 text-sm transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`}
                  >
                    <Reply className="w-4 h-4" />
                    Reply
                  </motion.button>
                )}
              </div>

              {/* Reply Form */}
              <AnimatePresence>
                {showReplyBox[comment._id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={replyTexts[comment._id] || ''}
                        onChange={(e) => setReplyTexts(prev => ({ ...prev, [comment._id]: e.target.value }))}
                        placeholder="Write a reply..."
                        className={`flex-1 p-2 rounded-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReplySubmit(comment._id)}
                        disabled={submittingReply[comment._id]}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          theme === 'dark'
                            ? 'bg-blue-600 hover:bg-blue-500 text-white disabled:bg-gray-600'
                            : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400'
                        }`}
                      >
                        {submittingReply[comment._id] ? 'Replying...' : 'Reply'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Replies */}
              <AnimatePresence>
                {comment.replies?.map((reply, replyIndex) => (
                  <motion.div
                    key={reply._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: replyIndex * 0.1 }}
                    className={`ml-8 mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500'}`}>
                        <img className='rounded-full' src={reply?.user?.picture} alt="" />
                      </div>
                      <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {reply.user?.name}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <p className={`mb-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {reply.reply}
                    </p>

                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReplyLike(comment._id, reply._id)}
                        className={`flex items-center gap-1 text-xs transition-colors ${
                          reply.likes?.some(like => like.user === user?._id)
                            ? 'text-green-500'
                            : theme === 'dark' ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-500'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{reply.likes?.length || 0}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReplyDislike(comment._id, reply._id)}
                        className={`flex items-center gap-1 text-xs transition-colors ${
                          reply.dislikes?.some(dislike => dislike.user === user?._id)
                            ? 'text-red-500'
                            : theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                        <span>{reply.dislikes?.length || 0}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {!postData.comments?.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to comment!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default SinglePost