import Post from "../models/CommunityModel.js"


//* create a community post 
export const createNewCommunityPost = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login to create the community post",
      });
    }

    const { title, content, tags } = req.body;
    if (!title || !content || !tags) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    //* add new community post to the database 
    const post = await Post.create({ user: userId, title, content, tags });
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Error occurred while creating the community post",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* check ownerShip
export const checkOwnerShip = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login to edit the post",
      });
    }

    const { postId } = req.params;
    if (!postId) {
      return res.status(200).json({
        success: false,
        message: "Error: please make sure postId is valid",
      });
    }

    //* get the post data
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Error: post not found",
      });
    }

    //* check ownership
    const isOwner = post.user.toString() === userId.toString();

    return res.status(200).json({
      success: true, 
      isOwner,
    });

  } catch (error) {
    return res.status(200).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};


//* edit the community post
export const editCommunityPost = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login to edit the post",
      });
    }

    const { postId } = req.params;
    if (!postId) {
      return res.status(200).json({
        success: false,
        message: "Error getting the post details",
      });
    }

    //* get details for the post 
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Error: post not found",
      });
    }

    //* check ownership
    if (post.user.toString() !== userId.toString()) {
      return res.status(200).json({
        success: false,
        message: "You are not authorized to edit this post",
      });
    }

    const { title, content, tags } = req.body;

    if (!title || !content || !tags) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    //* update post
    post.title = title;
    post.content = content;
    post.tags = tags;
    post.edited = true; 

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
    });

  } catch (error) {
    return res.status(200).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* delete the community post
export const deleteCommunityPost = async(req,res) => {
  try {
    const {postId} = req.params
    const userId = req.user?._id
    if(!postId){
      return res.status(200).json({
        success : false,
        message : "Unable to get the post details"
      })
    }
    if(!userId){
      return res.status(200).json({
        success : false,
        message : "please login before deleting the post"
      })
    }

    //* delete the post 
    const isDeleted = await Post.findByIdAndDelete(postId) 
    if(!isDeleted){ 
      return res.status(200).json({
        success : false,
        message : "Error occured while deleting the post"
      })
    }

    res.status(200).json({
      success : true,
      message : "Successfully deleted the post"
    })
     
  } catch (error) {
    res.status(500).json({
      success : false,
      message : `Server error ${error.message}`
    })
  }
}

//* get single post  details 
export const getSinglePostById = async(req,res) => {
  try {
    const {postId}  = req.params
    if(!postId){
      return res.status(200).json({
        success : false,
        message : "Error unable to get the post details"
      })
    }

    //* get the post data 
    const post = await Post.findById(postId).populate({
  path: 'user',
  select: 'name picture'
}).populate({
  path: 'comments',
  populate: [
    {
      path: 'user',
      select: 'name picture'
    },
    {
      path: 'replies.user',
      select: 'name picture'
    }
  ]
});
if(!post){
  return res.status(200).json({
    success : false,
    message : "Error unable to recieve the data"
  })
}

res.status(200).json({
    success : true,
    post
  })

  } catch (error) {
    res.status(500).json({
      success : false,
      message : `Server error ${error.message}`
    })
  }
}

//* get all post
export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: 'user',
      select: 'name picture'
    });

    if (posts.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No post found"
      });
    }

    res.status(200).json({
      success: true,
      posts
    });

  } catch (error) {
    res.status(200).json({ 
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

//* like a post 
export const likePost = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { postId } = req.params;

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login to like the post",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Unable to find the post",
      });
    }

    const isAlreadyLiked = post.likes.some(
      (like) => like.user.toString() === userId.toString()
    );
    if (isAlreadyLiked) {
      return res.status(200).json({
        success: false,
        message: "You have already liked the post",
      });
    }

    const isDisliked = post.dislikes.some(
      (dislike) => dislike.user.toString() === userId.toString()
    );
    if (isDisliked) {
      post.dislikes = post.dislikes.filter(
        (dislike) => dislike.user.toString() !== userId.toString()
      );
    }

    post.likes.push({ user: userId });
    await post.save();

    res.status(200).json({
      success: true,
      message: "You liked the post",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error ${error.message}`,
    });
  }
};


//* dislike a post 
export const dislikePost = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { postId } = req.params;

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login to dislike the post",
      });
    }

    if (!postId) {
      return res.status(200).json({
        success: false,
        message: "Unable to get the post details",
      });
    }

    //* Get the post details
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Post not found",
      });
    }

    //* Check if user has already disliked the post
    const isAlreadyDisliked = post.dislikes.some(
      (user) => user.toString() === userId.toString()
    );
    if (isAlreadyDisliked) {
      return res.status(200).json({
        success: false,
        message: "You have already disliked the post",
      });
    }

    //* Check if user has liked -> remove like if present
    const isLiked = post.likes.some(
      (user) => user.toString() === userId.toString()
    );
    if (isLiked) {
      post.likes = post.likes.filter(
        (user) => user.toString() !== userId.toString()
      );
    }

    //* Add dislike
    post.dislikes.push({user : userId});
    await post.save();

    res.status(200).json({
      success: true,
      message: "You disliked the post",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error ${error.message}`,
    });
  }
};

//* comment on the post
export const commentOnPost = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { postId } = req.params;
    const { comments } = req.body;

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login to comment on the post",
      });
    }

    if (!postId) {
      return res.status(200).json({
        success: false,
        message: "Unable to get the post details",
      });
    }

    if (!comments || comments.length < 3) {
      return res.status(200).json({
        success: false,
        message: "Comment must be at least 3 characters long",
      });
    }

    //*  Get the post details
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Unable to find the post",
      });
    }

    //* Push the comment into the comments subSchema
    post.comments.push({ user: userId, comment: comments });
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error ${error.message}`,
    });
  }
};

//* like the comment 
export const likeComment = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { postId, commentId } = req.params;

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login to like the comment",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Unable to find the post",
      });
    }

    const singleComment = post.comments.id(commentId);
    if (!singleComment) {
      return res.status(200).json({
        success: false,
        message: "Unable to find the comment",
      });
    }

    // Check if already liked
    const isAlreadyLiked = singleComment.likes.some(
      (like) => like.user.toString() === userId.toString()
    );
    if (isAlreadyLiked) {
      return res.status(200).json({
        success: false,
        message: "You have already liked the comment",
      });
    }

    // If disliked → remove dislike
    const isAlreadyDisliked = singleComment.dislikes.some(
      (dislike) => dislike.user.toString() === userId.toString()
    );
    if (isAlreadyDisliked) {
      singleComment.dislikes = singleComment.dislikes.filter(
        (dislike) => dislike.user.toString() !== userId.toString()
      );
    }

    // Add like
    singleComment.likes.push({ user: userId });
    await post.save();

    res.status(200).json({
      success: true,
      message: "Successfully liked the comment",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error ${error.message}`,
    });
  }
};


//* dislike the comment
export const dislikeComment = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { postId, commentId } = req.params;

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login to dislike the comment",
      });
    }

    if (!postId) {
      return res.status(200).json({
        success: false,
        message: "Unable to get the post details",
      });
    }

    if (!commentId) {
      return res.status(200).json({
        success: false,
        message: "Unable to get the comment details",
      });
    }

    //* Get the post details
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Unable to find the post",
      });
    }

    //* Find the comment
    const singleComment = post.comments.id(commentId);
    if (!singleComment) {
      return res.status(200).json({
        success: false,
        message: "Unable to find the comment",
      });
    }

    //* Check if already disliked
    const isAlreadyDisliked = singleComment.dislikes.some(
      (user) => user.toString() === userId.toString()
    );
    if (isAlreadyDisliked) {
      return res.status(200).json({
        success: false,
        message: "You have already disliked the comment",
      });
    }

    //* If liked → remove like
    const isAlreadyLiked = singleComment.likes.some(
      (user) => user.toString() === userId.toString()
    );
    if (isAlreadyLiked) {
      singleComment.likes = singleComment.likes.filter(
        (user) => user.toString() !== userId.toString()
      );
    }

    //* Add dislike
    singleComment.dislikes.push({user : userId});
    await post.save();

    res.status(200).json({
      success: true,
      message: "Successfully disliked the comment",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error ${error.message}`,
    });
  }
};

//* reply on the comment
export const replyOnComment = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { postId, commentId } = req.params;
    const { reply } = req.body;

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login to reply on comment",
      });
    }

    if (!postId || !commentId) {
      return res.status(200).json({
        success: false,
        message: "Unable to receive the post data",
      });
    }

    if (!reply || reply.length < 3) {
      return res.status(200).json({
        success: false,
        message: "Reply must be more than 2 letters",
      });
    }

    //* Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Error: post not found",
      });
    }

    //* Find the comment
    const singleComment = post.comments.id(commentId);
    if (!singleComment) {
      return res.status(200).json({
        success: false,
        message: "Comment not found",
      });
    }

    //* Push reply into replies array
    singleComment.replies.push({ reply, user: userId });

    //* Save post
    await post.save();

    res.status(200).json({
      success: true,
      message: "Successfully added the reply",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* like the reply 
export const likeReply = async (req, res) => {
  try {
    const { postId, commentId, replyId } = req.params;

    if (!postId || !commentId || !replyId) {
      return res.status(200).json({
        success: false,
        message: "Error: unable to retrieve the details"
      });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login before liking the reply"
      });
    }

    //* Find post with nested comments and replies
    const singlepost = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "replies" }
    });

    if (!singlepost) {
      return res.status(200).json({
        success: false,
        message: "Error: post not found"
      });
    }

    //* Find comment
    const singleComment = singlepost.comments.find(
      (comment) => comment._id.toString() === commentId.toString()
    );
    if (!singleComment) {
      return res.status(200).json({
        success: false,
        message: "Comment not found"
      });
    }

    //* Find reply
    const reply = singleComment.replies.find(
      (r) => r._id.toString() === replyId.toString()
    );
    if (!reply) {
      return res.status(200).json({
        success: false,
        message: "Reply not found"
      });
    }

    //* Already liked?
    const isAlreadyLiked = reply.likes.some(
      (like) => like.user.toString() === userId.toString()
    );
    if (isAlreadyLiked) {
      return res.status(200).json({
        success: false,
        message: "You have already liked the reply"
      });
    }

    //* If disliked before, remove dislike
    const isAlreadyDisliked = reply.dislikes.some(
      (dislike) => dislike.user.toString() === userId.toString()
    );
    if (isAlreadyDisliked) {
      reply.dislikes = reply.dislikes.filter(
        (dislike) => dislike.user.toString() !== userId.toString()
      );
    }

    //* Add like
    reply.likes.push({ user: userId });

    //* Save parent doc
    await singlepost.save();

    res.status(200).json({
      success: true,
      message: "Successfully liked the reply"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};

//* dislike the reply 
export const dislikeReply = async (req, res) => {
  try {
    const { postId, commentId, replyId } = req.params;

    if (!postId || !commentId || !replyId) {
      return res.status(200).json({
        success: false,
        message: "Error: unable to retrieve the details"
      });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Please login before disliking the reply"
      });
    }

    //* Find post with nested comments and replies
    const singlepost = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "replies" }
    });

    if (!singlepost) {
      return res.status(200).json({
        success: false,
        message: "Error: post not found"
      });
    }

    //* Find comment
    const singleComment = singlepost.comments.find(
      (comment) => comment._id.toString() === commentId.toString()
    );
    if (!singleComment) {
      return res.status(200).json({
        success: false,
        message: "Comment not found"
      });
    }

    //* Find reply
    const reply = singleComment.replies.find(
      (r) => r._id.toString() === replyId.toString()
    );
    if (!reply) {
      return res.status(200).json({
        success: false,
        message: "Reply not found"
      });
    }

    //* Already disliked?
    const isAlreadyDisliked = reply.dislikes.some(
      (dislike) => dislike.user.toString() === userId.toString()
    );
    if (isAlreadyDisliked) {
      return res.status(200).json({
        success: false,
        message: "You have already disliked the reply"
      });
    }

    //* If liked before, remove like
    const isAlreadyLiked = reply.likes.some(
      (like) => like.user.toString() === userId.toString()
    );
    if (isAlreadyLiked) {
      reply.likes = reply.likes.filter(
        (like) => like.user.toString() !== userId.toString()
      );
    }

    //* Add dislike
    reply.dislikes.push({ user: userId });

    //* Save parent doc
    await singlepost.save();

    res.status(200).json({
      success: true,
      message: "Successfully disliked the reply"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};
