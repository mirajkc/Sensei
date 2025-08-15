import express from 'express'
import { signIn } from '../controller/UserController.js'
const userRouter = express.Router()

//* sign in user using the google
userRouter.post('/signingoogle' , signIn )


export default userRouter