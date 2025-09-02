import express from 'express'
import 'dotenv/config'
import connDb from './configs/connectdb.js'
import userRouter from './routes/UserRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectCloudinary from './configs/cloudinaryconnect.js'
import sellerRouter from './routes/SellerRoute.js'
import adminRouter from './routes/AdminRoute.js'
import courseRouter from './routes/CourseRouter.js'
import wishlistRouter from './routes/WishListRoute.js'
import cartRouter from './routes/cartRoute.js'
import purchaseRouter from './routes/Purchase.js'
import commentRouter from './routes/CommentRoute.js'

const app = express()
const PORT = process.env.PORT_NUMBER || 5000

// Middleware
app.use(express.json()) 
app.use(cookieParser())

// CORS
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Connect to DB
await connDb()
await connectCloudinary()

// Routes
app.use('/api/user', userRouter)
app.use( '/api/seller' , sellerRouter )
app.use('/api/admin' , adminRouter)
app.use('/api/course', courseRouter)
app.use('/api/wishlist' , wishlistRouter)
app.use('/api/cart',cartRouter )
app.use('/api/purchase', purchaseRouter)
app.use('/api/comment', commentRouter)

app.get('/', (req, res) => {
  res.send("Server is working fine")
})

app.listen(PORT, () => {
  console.log(`Server is Listening On PORT ${PORT}`)
})
