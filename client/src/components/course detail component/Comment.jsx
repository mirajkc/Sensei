import React, { useState, useEffect } from "react";
import { MessageCircle, User, Calendar, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import useAppContext from '../../context/AppContext.jsx';
import axios from "axios";
import { useParams } from 'react-router-dom';

const Comment = () => {
  
  const {theme} = useAppContext()
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState({});
  const {courseId} = useParams()

  const addNewComment = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/comment/addnewcomment/${courseId}`, { comment });
      
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setComment("");
        getAllComment();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllComment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/comment/getallcomment/${courseId}`);
      if (!data.success) {
        return toast.error(data.message);
      } else {
        setCommentData(data.course);
      }
    } catch (error) {
      toast.error("Error fetching comments");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    getAllComment();
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${
      theme === "dark" 
        ? "bg-gray-900 text-white" 
        : "bg-gray-50 text-gray-900"
    } rounded-lg transition-all duration-300`}>
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className={`w-6 h-6 ${
          theme === "dark" ? "text-blue-400" : "text-blue-600"
        }`} />
        <h2 className="text-2xl font-bold">
          Comments ({commentData?.comments?.length || 0})
        </h2>
      </div>

      {/* Comment Form */}
      <div className={`mb-8 p-6 rounded-lg border ${
        theme === "dark" 
          ? "bg-gray-800 border-gray-700" 
          : "bg-white border-gray-200"
      } shadow-sm`}>
        <div onSubmit={(e) => { e.preventDefault(); addNewComment(); }} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              Share your thoughts
            </label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 resize-none focus:outline-none focus:ring-2 ${
                theme === "dark" 
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              onClick={addNewComment}
              disabled={loading || !comment.trim()}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                loading || !comment.trim()
                  ? theme === "dark" 
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Add Comment
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {commentData?.comments?.length > 0 ? (
          commentData.comments.map((commentItem, index) => (
            <div 
              key={commentItem?._id || index}
              className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-md ${
                theme === "dark" 
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              {/* Comment Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  {/* User Avatar */}
                  <div className="relative">
                    {commentItem?.user?.picture ? (
                      <img 
                        src={commentItem.user.picture} 
                        alt={commentItem?.user?.name || "User"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                      }`}>
                        <User className={`w-5 h-5 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`} />
                      </div>
                    )}
                  </div>
                  
                  {/* User Info */}
                  <div>
                    <h4 className={`font-semibold text-lg ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {commentItem?.user?.name || "Anonymous User"}
                    </h4>
                    
                  </div>
                </div>
                
                {/* Date */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className={`w-4 h-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                    {formatDate(commentItem?.createdAt)}
                  </span>
                </div>
              </div>
                <div className={`flex justify-center${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                <p className="text-base leading-relaxed">
                  {commentItem?.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className={`text-center py-12 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            <MessageCircle className={`w-12 h-12 mx-auto mb-4 ${
              theme === "dark" ? "text-gray-600" : "text-gray-400"
            }`} />
            <p className="text-lg font-medium mb-2">No comments yet</p>
            <p>Be the first to share your thoughts about this course!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;