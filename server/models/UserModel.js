import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  //* Personal details
  name: { type: String, required: true },
  picture: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phoneno: { type: String },
  address: { type: String },
  bio: { type: String },  
  link: { type: String },   //* portfolio or website

  //* Learning-related
  enrolledCourses: [{
    course : {type : mongoose.Schema.Types.ObjectId , ref:"Course"},
    createdAt:{type : Date , default : Date.now},
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false }
  }],
  

  //* cart and wishlist 
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  cart : [{type : mongoose.Schema.Types.ObjectId , ref : "Course" }],



  //* Social / profile links
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  twitter: { type: String, default: "" },
  facebook: { type: String, default: "" },

  //* Personal student details
  specialization: { type: String, default: "" },
  achievements: [{ type: String }],
  grade: { type: String }

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
