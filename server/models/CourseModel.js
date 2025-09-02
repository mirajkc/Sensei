import mongoose, { Types } from 'mongoose';

//* Lesson sub-schema
const lessonSchema = new mongoose.Schema({ 
  lessonNumber: { type: Number },
  title: { type: String, required: true },
  description: { type: String, required: true },
  whatYouWillLearn: { type: String, required: true },
  lessonDuration: { type: Number, required: true },
  textGuide: { type: String, required: true },
  videoGuide: { type: String } //* optional
});

//* comment subSchema 
const commentSchema = new mongoose.Schema({
  user : {type : mongoose.Schema.Types.ObjectId , ref:"User"},
  comment : {type : String , required : true},
  createdAt : {type : Date , default : Date.now}
})



//* Course schema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      "Web Development",
      "Digital Marketing",
      "Data Science",
      "Front End Development",
      "Back End Development",
      "Others"
    ]
  },
  skillLevel: { 
  type: String, 
  required: true, 
  enum: ["Beginner", "Intermediate", "Advanced"] 
},
language: { 
  type: String, 
  required: true 
},
  thumbnail: { type: String, required: true }, 
  trailer: { type: String, required: true },
  description: { type: String, required: true },
  whatYouWillLearn :{type :String , required :true},
  lessons: [lessonSchema],
  comments : [commentSchema],
  price: { type: Number, required: true },
  discountedPrice : {type : Number , required : true},

  //* Auto-calculated fields
  totalHours: { type: Number, default: 0 },
  totalNumberOfLessons: { type: Number, default: 0 },

  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now } 
});



//* Middleware to auto-calculate fields
courseSchema.pre("save", function(next) {

  const total = this.lessons.reduce((sum, lesson) => sum + lesson.lessonDuration, 0);
  this.totalHours = Math.round(total * 100) / 100;
  this.totalNumberOfLessons = this.lessons.length;
  this.updatedAt = new Date();
  this.lessons.forEach((lesson, index) => {
    lesson.lessonNumber = index + 1; 
  });

  next();
});
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
 