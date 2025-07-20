import express from 'express'
import upload from '../middlewares/multer.js'
import { addDoctor, loginAdmin } from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
//http://localhost:3000/api/admin/add-doctor

adminRouter.post('/login-admin', loginAdmin);
//http://localhost:3000/api/admin/login-admin


export default adminRouter