import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="w-full max-w-6xl m-5 h-[90vh]">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">

        {/* Desktop Header */}
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] max-sm:grid-cols-1 max-sm:gap-2 max-sm:px-4 max-sm:py-4 items-center py-3 px-6 border-b text-gray-700"
          >
            {/* Desktop View */}
            <div className="max-sm:hidden contents">
              <p>{index + 1}</p>
              <div className="flex items-center gap-2">
                <img src={item.userData.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                <p>{item.userData.name}</p>
              </div>
              <p>{item.payment ? 'Online' : 'CASH'}</p>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled 
                ? <p className='text-xs font-medium text-red-500'>Cancelled</p>
                : item.isCompleted
                ? <p className='text-xs font-medium text-green-500'>Completed</p>
                : <div className="flex gap-3 justify-center">
                    <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="Cancel" className="w-5 h-5 cursor-pointer" />
                    <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="Approve" className="w-5 h-5 cursor-pointer" />
                  </div>
              }
            </div>

            {/* Mobile View */}
            <div className="sm:hidden flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <img src={item.userData.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                <p className="font-medium">{item.userData.name}</p>
              </div>
              <p><span className="font-semibold">Payment:</span> {item.payment ? 'Online' : 'CASH'}</p>
              <p><span className="font-semibold">Age:</span> {calculateAge(item.userData.dob)}</p>
              <p><span className="font-semibold">Date:</span> {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p><span className="font-semibold">Fees:</span> {currency}{item.amount}</p>
              <div className="flex items-center gap-3">
                <span className="font-semibold">Action:</span>
                {
                  item.cancelled 
                  ? <p className='text-xs font-medium text-red-500'>Cancelled</p>
                  : item.isCompleted
                  ? <p className='text-xs font-medium text-green-500'>Completed</p>
                  : <div className="flex gap-3">
                      <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="Cancel" className="w-5 h-5 cursor-pointer" />
                      <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="Approve" className="w-5 h-5 cursor-pointer" />
                    </div>
                }
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default DoctorAppointments



// 14:36