import { useState, createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
  // const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
  const [doctorData, setDoctorData] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false)


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

  const getDashData = async () => {
    try {
       console.log('Getting dashboard data...'); // <-- yeh add karo
        const { data } = await axios.get('http://localhost:3000/api/doctor/dashboard',{ headers: { dToken } }
);
      if (data.success) {
        toast.success(data.message);
        setDashData(data.dashData)
        console.log(data.dashData);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        console.log("Dashboard Error for doctor:", error);
        toast.error(error.message);
    }
  }

  const getProfileData = async () => {
    try {
      const {data} = await axios.get(`http://localhost:3000/api/doctor/doctor-profile`, {headers:{dToken}})
      if(data.success){
        setProfileData(data.profileData)
        console.log(data.profileData);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }

  const value = {
    dToken, setDToken,
    doctorData, setDoctorData,
    appointments, setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData, setDashData, 
    getDashData,
    profileData, setProfileData, getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
