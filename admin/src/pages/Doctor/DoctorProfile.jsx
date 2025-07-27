import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async ()=> {
    try {
      const updateData = {
  name: profileData.name,
  degree: profileData.degree,
  speciality: profileData.speciality,
  experience: profileData.experience,
  about: profileData.about,
  address: profileData.address,
  fees: profileData.fees,
  available: profileData.available
}


      const {data} = await axios.post(`http://localhost:3000/api/doctor/update-profile`, updateData, {headers:{dToken}})

      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.message);
      toast.error(error)
      
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden bg-[#5F6FFF] flex items-center justify-center">
          <img src={profileData.image} alt="Doctor" className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-md" />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isEdit ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="border p-1 rounded"
              />
            ) : (
              profileData.name
            )}
          </h2>
          
          <p className="text-gray-600">
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={profileData.degree}
                  onChange={(e) => setProfileData(prev => ({ ...prev, degree: e.target.value }))}
                  className="border p-1 rounded mr-2"
                />
                <input
                  type="text"
                  value={profileData.speciality}
                  onChange={(e) => setProfileData(prev => ({ ...prev, speciality: e.target.value }))}
                  className="border p-1 rounded"
                />
              </>
            ) : (
              `${profileData.degree} - ${profileData.speciality}`
            )}
          </p>

          <div>
            <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.experience}
                  onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                  className="border p-1 rounded"
                />
              ) : (
                `${profileData.experience} Years Experience`
              )}
            </span>
          </div>

          {/* About Section */}
          <div>
            <h3 className="font-semibold text-gray-700">About:</h3>
            {isEdit ? (
              <textarea
                value={profileData.about}
                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                className="border w-full p-2 rounded"
              />
            ) : (
              <p className="text-gray-600">{profileData.about}</p>
            )}
          </div>

          {/* Fees */}
          <p className="text-lg text-gray-700">
            Appointment Fee:{" "}
            <span className="font-semibold">
              {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                  value={profileData.fees}
                  className="border p-1 rounded"
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-gray-700">Address:</h3>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={profileData.address.line1}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))}
                  className="border p-1 rounded w-full mb-1"
                />
                <input
                  type="text"
                  value={profileData.address.line2}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))}
                  className="border p-1 rounded w-full"
                />
              </>
            ) : (
              <>
                <p className="text-gray-600">{profileData.address.line1}</p>
                <p className="text-gray-600">{profileData.address.line2}</p>
              </>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2 mt-2">
            {isEdit ? (
              <input
                checked={profileData.available}
                type="checkbox"
                name="available"
                id="available"
                className="cursor-pointer accent-blue-500"
                onChange={(e) => setProfileData(prev => ({ ...prev, available: e.target.checked }))}
              />
            ) : (
              <>
                <input
                  checked={profileData.available}
                  disabled
                  type="checkbox"
                  name="available"
                  id="available"
                  className="cursor-not-allowed accent-blue-500"
                />
              </>
            )}
            <label htmlFor="available" className="text-sm text-gray-700">Available</label>
          </div>

          {/* Edit Button */}
          <button
  onClick={() => {
    if (isEdit) {
      updateProfile(); // If already editing, update
    } else {
      setIsEdit(true); // Otherwise, just enable edit mode
    }
  }}
  className="mt-4 cursor-pointer px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
>
  {isEdit ? 'Done' : 'Edit'}
</button>

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
