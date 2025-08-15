import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password : {type : String },
  createdAt: { type: Date, default: Date.now },
  phoneno: { type: String },
  address: { type: String },
  bio: { type: String },  
  link: { type: String }  
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
