import {v2 as cloudinary} from 'cloudinary'

import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js'


// API FOR ADDING DOCTORS
export const addDoctor = async (req, res) => {
    try {
        const {
            name, email, password, speciality,
            degree, experience, about, fees, address } = req.body;

        const imageFile = req.file;

        // console.log({
        //     name, email, password, speciality,
        //     degree, experience, about, fees, address,
        //     available, date, slots_booked
        // }, imageFile);

        if(!name || !email || !password || !speciality || !degree || !experience ||!about || !fees || !address){
            return res.json({success:false, message:"Missing Details"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid Email"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter a Strong Password"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        

        res.status(200).json({ success: true, message: "Doctor added successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

            return res.status(200).json({
                success: true,
                message: "Login successful",
                token
            });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export const cancelAppointmentAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    // Remove the time slot from the booked list
    slots_booked[slotDate] = slots_booked[slotDate]?.filter(e => e !== slotTime);

    // ✅ update both doctor and appointment
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    // ✅ set appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    return res.json({ success: true, message: "Appointment cancelled successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,10)
        }
        res.json({success:true, dashData})
    } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}