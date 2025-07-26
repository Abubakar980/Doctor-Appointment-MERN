import express from 'express'
import { appointmentsDoctor, doctorList, loginDoctor } from '../controllers/doctorsController.js'
import authDoctor from '../middlewares/authDoctor.js'


const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
//http://localhost:3000/api/doctor/login
doctorRouter.get('/doctor-appointments', authDoctor,appointmentsDoctor)
//http://localhost:3000/api/doctor/doctor-appointments

export default doctorRouter