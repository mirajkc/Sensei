import mongoose, { Types } from 'mongoose';


const sellerSchema = new mongoose.Schema({ 


  //* basic information required during login 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },

  //* profile details 

  bio : { type : String , default : "" },
  specialization : { type : String , default : "" },
  qualification : { type : String , default : "" },
  experience : { type : String , default : "" },
  location : { type : String , default : "" },
  contactNumber : { type : String , default : "" },

  //* social links
    socialLinks: {
    website: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },


  //* peformnace
   rating: { type: Number, default: 0 },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],   
   dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  createdAt: { type: Date, default: Date.now },

});


const Seller = mongoose.models.Seller || mongoose.model("Seller", sellerSchema);
export default Seller;
