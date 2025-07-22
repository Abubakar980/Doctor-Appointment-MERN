import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'



const userRouter = express.Router()

userRouter.post('/register', registerUser)
//http://localhost:3000/api/user/register

userRouter.post('/login', loginUser)
//http://localhost:3000/api/user/login

export default userRouter