import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true }
}, { timestamps: true });

const blogSchema = new mongoose.Schema({
  createdBy : {type :String , required : true},
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  content: { type: String, required: true },
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    }
  ],
  dislikes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    }
  ],
  rating : {type : Number},
  comments: [commentSchema],
  category : {type : String , required : true , enum : ["Web Development", "Mobile Development" , "Data & AI" , "Design & Creative" ,  "Cybersecurity & DevOps" , "Others" ]}

}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
