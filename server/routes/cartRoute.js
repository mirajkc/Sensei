import express from 'express'
import verifyUser from '../middleware/UserMiddleware.js'
import { addToCart, getCartDetails, removeFromCart } from '../controller/cartController.js'
const cartRouter = express.Router()


cartRouter.post('/addtocart/:courseId' , verifyUser , addToCart )
cartRouter.delete('/removefromcart/:courseId' , verifyUser , removeFromCart)
cartRouter.get('/getCartDetails' , verifyUser , getCartDetails)

export default cartRouter