import express from 'express'
import upload from '../middlewares/multer.js'
import { addDoctor, allDoctors, appointmentsAdmin, cancelAppointmentAdmin, loginAdmin } from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorsController.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
//http://localhost:3000/api/admin/add-doctor

adminRouter.post('/login-admin', loginAdmin);
//http://localhost:3000/api/admin/login-admin

adminRouter.post('/all-doctors', authAdmin, allDoctors);
//http://localhost:3000/api/admin/all-doctors

adminRouter.post('/change-availability', authAdmin, changeAvailability);
//http://localhost:3000/api/admin/change-availability

adminRouter.get('/appointments-admin', authAdmin, appointmentsAdmin);
//http://localhost:3000/api/admin/appointments-admin

adminRouter.post('/cancel-appointment-admin', authAdmin, cancelAppointmentAdmin);
//http://localhost:3000/api/admin/cancel-appointment-admin




export default adminRouter