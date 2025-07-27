import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile } from '../controllers/doctorsController.js'
import authDoctor from '../middlewares/authDoctor.js'


const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)

doctorRouter.post('/login', loginDoctor)
//http://localhost:3000/api/doctor/login

doctorRouter.get('/doctor-appointments', authDoctor,appointmentsDoctor)
//http://localhost:3000/api/doctor/doctor-appointments

doctorRouter.get('/doctor-appointments', authDoctor,appointmentsDoctor)
//http://localhost:3000/api/doctor/doctor-appointments

doctorRouter.post('/complete-appointment', authDoctor,appointmentComplete)
//http://localhost:3000/api/doctor/complete-appointment

doctorRouter.post('/cancel-appointment', authDoctor,appointmentCancel)
//http://localhost:3000/api/doctor/cancel-appointment

doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
//http://localhost:3000/api/doctor/dashboard

doctorRouter.get('/doctor-profile', authDoctor, doctorProfile)
//http://localhost:3000/api/doctor/doctor-profile

doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)
//http://localhost:3000/api/doctor/update-profile





export default doctorRouter