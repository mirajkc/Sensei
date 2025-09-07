import cloudinary from 'cloudinary'
import fs from 'fs'
import Blog from '../models/BlogModel.js'
import User from '../models/UserModel.js'


//* create a new blog
export const createNewBlog = async (req, res) => {
  try {
    if (!req.admin || !req.admin.email) {
      return res.status(200).json({
        success: false,
        message: "Unable to verify the admin"
      })
    }

    const { createdBy, title, content, category } = req.body

    if (!createdBy || !title || !content || !category) {
      return res.status(200).json({
        success: false,
        message: "All fields are required !!!"
      })
    }

    if (!req.file) {
      return res.status(200).json({
        success: false,
        message: "Thumbnail is required"
      })
    }

    //* Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'Sensei_all_images',
      use_filename: true,
      unique_filename: false,
    })
    fs.unlinkSync(req.file.path)

    const imageUrl = result.secure_url
    if (!imageUrl) {
      return res.status(200).json({
        success: false,
        message: "Image upload failed"
      })
    }

    //* Create blog in DB
    const blog = await Blog.create({
      createdBy,
      title,
      thumbnail: imageUrl,
      content,
      category
    })

    res.status(200).json({
      success: true,
      message: "Blog created successfully",
      blog
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    })
  }
}

//* get all the blogs
export const getAllBlogs = async(req,res) => {
  try {
    const blogs = await Blog.find()
    if(!blogs.length === 0){
      return res.status(200).json({
      success : false,
      message : "Error occured while frtching blog details"
      })
    }

    res.status(200).json({
      success : true,
      blogs
    })
  } catch (error) {
    res.status(200).json({
      success : false,
      message : `Server error ${error.message}`
    })
  }
}

//* get a single blog by the blog Id
export const getSingleBlogById = async(req,res) => {
  try {
    const {blogId} = req.params
    if(!blogId){
      return res.status(200).json({
        success : false,
        message : "Error unable to retireve the blog details"
      })
    }
    //* get the blog data
    const blog = await Blog.findById(blogId).populate({
      path : 'comments.user',
      select : "name picture  "
    })
    if(!blog){
      return res.status(200).json({
        success : false,
        message : "Blog not found"
      })
    }
    res.status(200).json({
      success : true,
      blog
    }) 
  } catch (error) {
    res.status(500).json({
      success : false,
      message : `Server error ${error.message}`
    })
  }
}

//* update the blog
export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const email = req.admin?.email;

    if (!blogId) {
      return res.status(200).json({
        success: false,
        message: "Error unable to retrieve the blog details",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(200).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (!email) {
      return res.status(200).json({
        success: false,
        message: "Error unable to authenticate the admin",
      });
    }

    const { createdBy , title, content, category } = req.body;

    if (!title || !content || !category || !createdBy) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    let imageUrl = blog.thumbnail;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Sensei_all_images',
        use_filename: true,
        unique_filename: false,
      });
      fs.unlinkSync(req.file.path);

      if (!result.secure_url) {
        return res.status(200).json({
          success: false,
          message: "Image upload failed",
        });
      }

      imageUrl = result.secure_url;
    }

    blog.title = title;
    blog.content = content;
    blog.category = category;
    blog.thumbnail = imageUrl;
    blog.createdBy = createdBy

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* delete the blog
export const deleteBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const email = req.admin?.email;

    if (!blogId) {
      return res.status(200).json({
        success: false,
        message: "Error unable to get the blog details",
      });
    }

    if (!email) {
      return res.status(200).json({
        success: false,
        message: "Error unable to authenticate the admin",
      });
    }

    const result = await Blog.findByIdAndDelete(blogId);

    if (!result) {
      return res.status(200).json({
        success: false,
        message: "Error occurred while deleting the blog",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* add new comment in to the blog
export const addNewComment = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Error: only users can comment on a blog post",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Error: user not found",
      });
    }

    const { blogId } = req.params;
    const { comment } = req.body;

    if (!comment || comment.length < 2) {
      return res.status(200).json({
        success: false,
        message: "Error: comment must be at least 2 characters",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(200).json({
        success: false,
        message: "Error: blog not found",
      });
    }

    blog.comments.push({ comment, user: userId });
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Successfully added the comment",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* like the blog
export const likeTheBlog = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Error: only users can like a blog post",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Error: user not found",
      });
    }

    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(200).json({
        success: false,
        message: "Error: blog not found",
      });
    }

    //* Check if user has already liked the blog
    const isAlreadyLiked = blog.likes.some(item => item.user.toString() === userId.toString());
    if (isAlreadyLiked) {
      return res.status(200).json({
        success: false,
        message: "Error: you have already liked the blog",
      });
    }

    //* Remove from dislikes if present
    const isAlreadyDisliked = blog.dislikes.some(item => item.user.toString() === userId.toString());
    if (isAlreadyDisliked) {
      blog.dislikes = blog.dislikes.filter(item => item.user.toString() !== userId.toString());
    }

    //* Add like
    blog.likes.push({ user: userId });

    //* Calculate rating
    const totalParticipation = blog.likes.length + blog.dislikes.length;
    const totalLikes = blog.likes.length;
    blog.rating = totalParticipation ? (totalLikes / totalParticipation) * 5 : 0;

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Added a like",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* dislike the blog
export const dislikeTheBlog = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "Error: only users can dislike a blog post",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Error: user not found",
      });
    }

    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(200).json({
        success: false,
        message: "Error: blog not found",
      });
    }

    //* Check if user has already disliked the blog
    const isAlreadyDisliked = blog.dislikes.some(item => item.user.toString() === userId.toString());
    if (isAlreadyDisliked) {
      return res.status(200).json({
        success: false,
        message: "Error: you have already disliked the blog",
      });
    }

    //* Remove from likes if present
    const isAlreadyLiked = blog.likes.some(item => item.user.toString() === userId.toString());
    if (isAlreadyLiked) {
      blog.likes = blog.likes.filter(item => item.user.toString() !== userId.toString());
    }

    //* Add dislike
    blog.dislikes.push({ user: userId });

    //* Calculate rating
    const totalParticipation = blog.likes.length + blog.dislikes.length;
    const totalLikes = blog.likes.length;
    blog.rating = totalParticipation ? (totalLikes / totalParticipation) * 5 : 0;

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Added a dislike",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

