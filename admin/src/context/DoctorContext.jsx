import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const [dToken, setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [appointments, setAppointments] = useState([])

    const getAppointments = async () => {
        try {
            const {data} = await axios.get('http://localhost:3000/api/doctor/doctor-appointments', {headers:{dToken}})
            if(data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
        dToken, setDToken,
        getAppointments,
        appointments, setAppointments
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider