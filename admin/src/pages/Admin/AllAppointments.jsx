import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import {assets} from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointmentAdmin } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)


    
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl mt-5 h-[80vh] mx-auto'>
      <h2 className='mb-4 text-2xl font-semibold text-gray-800'>All Appointments</h2>
      <div className='bg-white border rounded-lg shadow-sm text-sm max-h-[75vh] overflow-y-auto'>

        {/* Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-semibold text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* List */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b text-gray-600 hover:bg-gray-50 transition-all'
          >
            <p className='max-sm:hidden'>{index + 1}</p>

            {/* Patient */}
            <div className='flex items-center gap-2'>
              <img
                src={item.userData?.image || '/default-user.png'}
                alt='user'
                className='w-9 h-9 rounded-full object-cover ring-1 ring-gray-300'
              />
              <p>{item.userData?.name || 'N/A'}</p>
            </div>

            <p className='max-sm:hidden'>
              {item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}
            </p>

            <p>
              <span className='font-medium text-gray-700'>{slotDateFormat(item.slotDate)}</span>
              <span className='text-xs text-gray-500'> | {slotDateFormat(item.slotTime)}</span>
            </p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.docData.image} alt="" /><p>{item.docData?.name || 'N/A'}</p>
            </div>

            <p>{currency}{item.amount}</p>

            {
              item.cancelled ? <p className='text-red-500 text-xs font-medium'>Cancelled</p> 
              : <img onClick={()=>cancelAppointmentAdmin(item._id)}  className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
