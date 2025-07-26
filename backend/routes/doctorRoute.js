import express from 'express'
import { doctorList, loginDoctor } from '../controllers/doctorsController.js'


const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
//http://localhost:3000/api/doctor/login

export default doctorRouter