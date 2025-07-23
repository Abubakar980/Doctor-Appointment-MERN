import express from 'express'
import { getProfile, loginUser, registerUser, updateProfile } from '../controllers/userController.js'
import upload from '../middlewares/multer.js'
import authUser from '../middlewares/authUser.js'



const userRouter = express.Router()

userRouter.post('/register', registerUser)
//http://localhost:3000/api/user/register

userRouter.post('/login', loginUser)
//http://localhost:3000/api/user/login

userRouter.get('/get-profile', authUser, getProfile)
//http://localhost:3000/api/user/get-profile

userRouter.post('/update-profile', upload.single("image"),authUser , updateProfile)
//http://localhost:3000/api/user/update-profile




export default userRouter