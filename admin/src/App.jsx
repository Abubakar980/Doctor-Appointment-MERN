import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctors from './pages/Admin/AddDoctors';
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from './pages/Admin/Dashboard';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';


const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)




  return aToken || dToken ? (
    <div className='bg-[#f8f9fd]'>
      <ToastContainer position="top-right"/>
      <Navbar/>
      <div className='flex items-center'>
        <Sidebar/>
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<><Dashboard/></>}/>
          <Route path='/all-appointments' element={<><AllAppointments/></>}/>
          <Route path='/add-doctor' element={<><AddDoctors/></>}/>
          <Route path='/doctor-list' element={<><DoctorsList/></>}/>
         
         
         
         
          {/* Doctors Routes */}
          <Route path='/doctor-dashboard' element={<><DoctorDashboard/></>}/>
          <Route path='/doctor-appointments' element={<><DoctorAppointments/></>}/>
          <Route path='/doctor-profile' element={<><DoctorProfile/></>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login/>
      <ToastContainer position="top-right"/>
    </>
  )
}

export default App