import { useState, createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
  const [doctorData, setDoctorData] = useState({});
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/api/doctor/doctor-appointments',
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/doctor/complete-appointment',
        { appointmentId, docId: doctorData._id },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        await getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/doctor/cancel-appointment',
        { appointmentId, docId: doctorData._id },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        await getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken, setDToken,
    doctorData, setDoctorData,
    appointments, setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
