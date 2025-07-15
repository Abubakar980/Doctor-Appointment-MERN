import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => ([...prev, timeSlots]));
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return docInfo && (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      {/* Top section: Doctor info */}
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Doctor photo */}
        <div className="flex-shrink-0">
          <img
            src={docInfo.image}
            alt=""
            className="rounded-lg bg-[#5f6fff] w-full sm:w-52 h-[270px] object-cover shadow"
          />
        </div>

        {/* Doctor details card */}
        <div className="flex-1 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
            <span>{docInfo.degree} - {docInfo.speciality}</span>
            <span className="border px-2 py-0.5 rounded-full text-xs">{docInfo.experience}</span>
          </div>

          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-700">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fee:{' '}
            <span className="text-gray-800 font-semibold">
              {currencySymbol}{docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-12">
        <p className="text-lg font-semibold text-gray-800 mb-4">Booking slots</p>

        {/* Date slots */}
        <div className="flex gap-3 overflow-x-auto pb-3">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => {
              const date = item[0]?.datetime;
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime('');
                  }}
                  className={`flex flex-col items-center justify-center min-w-16 px-4 py-3 rounded-full cursor-pointer text-sm transition-all
                    ${slotIndex === index
                      ? 'bg-[#5f6fff] text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <span className="font-semibold">
                    {date && daysOfWeek[date.getDay()]}
                  </span>
                  <span>
                    {date && date.getDate()}
                  </span>
                </div>
              );
            })}
        </div>

        {/* Time slots */}
        <div className="mt-6 flex flex-wrap gap-3">
          {docSlots[slotIndex]?.map((slot, i) => (
            <button
              key={i}
              onClick={() => setSlotTime(slot.time)}
              className={`px-4 py-2 rounded-full border text-sm transition
                ${slotTime === slot.time
                  ? 'bg-[#5f6fff] text-white border-[#5f6fff]'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
            >
              {slot.time}
            </button>
          ))}
        </div>

        {/* Book button */}
        <div className="mt-8">
          <button
            disabled={!slotTime}
            className={`w-full sm:w-auto px-6 py-3 rounded-full text-white font-medium
              ${slotTime
                ? 'bg-[#5f6fff] hover:bg-[#4b56db] transition'
                : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            Book an appointment
          </button>
        </div>
      </div>


      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointment;
