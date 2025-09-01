import express from 'express'
import verifyUser from '../middleware/UserMiddleware.js'
import { purchaseCourse, validateCoupon } from '../controller/PurchaseController.js'

const purchaseRouter = express.Router()

purchaseRouter.post('/verifycoupon', verifyUser, validateCoupon)

purchaseRouter.post('/cartPurchase', verifyUser , purchaseCourse)

export default purchaseRouter