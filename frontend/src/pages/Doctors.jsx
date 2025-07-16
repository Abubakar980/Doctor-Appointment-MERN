import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();

  const [showFilter, setShowFilter] = useState(true);
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className='px-4'>
      <p className='text-gray-600 mb-4'>Browse through the doctors specialist.</p>

      <div className='flex flex-col sm:flex-row items-start gap-4 mt-5 text-gray-600'>
        {/* Filter toggle button on mobile */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-[#5f6fff] text-white' : ''
          }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        {/* Filters - now conditionally rendered */}
        {(showFilter || window.innerWidth >= 640) && (
          <div className='flex flex-col gap-4 text-sm text-gray-600 w-full sm:w-auto'>
            <p
              onClick={() =>
                speciality === 'General Physician'
                  ? navigate('/doctors')
                  : navigate('/doctors/General Physician')
              }
              className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === 'General Physician'
                  ? 'bg-indigo-100 text-black'
                  : ''
              }`}
            >
              General Physician
            </p>
            <p
              onClick={() =>
                speciality === 'Gynecologist'
                  ? navigate('/doctors')
                  : navigate('/doctors/Gynecologist')
              }
              className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === 'Gynecologist'
                  ? 'bg-indigo-100 text-black'
                  : ''
              }`}
            >
              Gynecologist
            </p>
            <p
              onClick={() =>
                speciality === 'Dermatologist'
                  ? navigate('/doctors')
                  : navigate('/doctors/Dermatologist')
              }
              className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === 'Dermatologist'
                  ? 'bg-indigo-100 text-black'
                  : ''
              }`}
            >
              Dermatologist
            </p>
            <p
              onClick={() =>
                speciality === 'Pediatricians'
                  ? navigate('/doctors')
                  : navigate('/doctors/Pediatricians')
              }
              className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === 'Pediatricians'
                  ? 'bg-indigo-100 text-black'
                  : ''
              }`}
            >
              Pediatricians
            </p>
            <p
              onClick={() =>
                speciality === 'Neurologist'
                  ? navigate('/doctors')
                  : navigate('/doctors/Neurologist')
              }
              className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === 'Neurologist'
                  ? 'bg-indigo-100 text-black'
                  : ''
              }`}
            >
              Neurologist
            </p>
            <p
              onClick={() =>
                speciality === 'Gastroenterologist'
                  ? navigate('/doctors')
                  : navigate('/doctors/Gastroenterologist')
              }
              className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === 'Gastroenterologist'
                  ? 'bg-indigo-100 text-black'
                  : ''
              }`}
            >
              Gastroenterologist
            </p>
          </div>
        )}

        {/* Doctor cards */}
        <div className='w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
              key={index}
            >
              <img
                className='bg-blue-50 w-full h-48 object-cover'
                src={item.image}
                alt={item.name}
              />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-green-500'>
                  <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                  <p>Available</p>
                </div>
                <p className='font-semibold'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
