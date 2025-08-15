import express from 'express'
import { adminLogin } from '../controller/AdminController.js'
import verifyAdmin from '../middleware/AdminMiddleware.js'

const adminRouter = express.Router()

//* admin login
adminRouter.post('/login' , adminLogin)

//* verify admin 
adminRouter.get('/verifyadmin' , verifyAdmin , (req,res)=>{
   res.json({
    success: true,
    admin  : req.admin
  });
} )

export default  adminRouter