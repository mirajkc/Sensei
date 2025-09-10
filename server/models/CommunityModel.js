import mongoose from 'mongoose'

//* reply sub Schema

const replySchema = new mongoose.Schema({
  reply : {type : String , required : true},
  user : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true},
  likes : [{ user : {type : mongoose.Schema.Types.ObjectId , ref : "User"} }],
  dislikes : [{ user : {type : mongoose.Schema.Types.ObjectId , ref : "User"} }]
} , {timestamps : true} )

//* comment subSchema
const commentSchema = new mongoose.Schema({
  comment : {type : String , required : true},
  user : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true},
  likes : [{ user : {type : mongoose.Schema.Types.ObjectId , ref : "User"} }],
  dislikes : [{ user : {type : mongoose.Schema.Types.ObjectId , ref : "User"} }],
  replies : [replySchema]
 } , {timestamps : true})

 //* post main Schema
 const postSchema = new mongoose.Schema({
  user : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true },
  title : {type : String , required : true},
  content : {type : String , required : true},
  edited : {type : Boolean , default : false},
  likes : [{ user : {type : mongoose.Schema.Types.ObjectId , ref : "User"} }],
  dislikes : [{ user : {type : mongoose.Schema.Types.ObjectId , ref : "User"} }],
  tags : {type : String , req : true , enum : ['Question' , 'Discussion' , 'Project' , 'Announcement' , 'Other']},
  comments : [commentSchema]
 } , {timestamps : true}) 

 const Post = mongoose.models.Post || mongoose.model("Post" , postSchema)
 
 export default Post