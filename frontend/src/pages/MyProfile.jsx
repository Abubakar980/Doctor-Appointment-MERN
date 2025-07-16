import React, { useState } from 'react'
import { assets } from '../assets/assets';

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "Abubakar",
    image: assets.profile_pic,
    email: "abubakarmujahid980@gmail.com",
    phone: "+1 234 567 890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2002-09-23" // updated to ISO format for date input compatibility
  });

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={userData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        {
          isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={e => setUserData(prev => ({
                ...prev,
                name: e.target.value
              }))}
              className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
            />
          ) : (
            <h2 className="text-2xl font-semibold">{userData.name}</h2>
          )
        }
      </div>

      <hr className="my-6" />

      <div className="space-y-4">
        <p className="text-lg font-semibold text-gray-700">CONTACT INFORMATION</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Email ID:</p>
            <p className="text-gray-800">{userData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone:</p>
            {
              isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={e => setUserData(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              ) : (
                <p className="text-gray-800">{userData.phone}</p>
              )
            }
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Address:</p>
          {
            isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={e => setUserData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value
                    }
                  }))}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={e => setUserData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value
                    }
                  }))}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            ) : (
              <p className="text-gray-800">
                {userData.address.line1}<br />
                {userData.address.line2}
              </p>
            )
          }
        </div>
      </div>

      <hr className="my-6" />

      <div className="space-y-4">
        <p className="text-lg font-semibold text-gray-700">BASIC INFORMATION</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Gender:</p>
            {
              isEdit ? (
                <select
                  value={userData.gender}
                  onChange={e => setUserData(prev => ({
                    ...prev,
                    gender: e.target.value
                  }))}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-800">{userData.gender}</p>
              )
            }
          </div>
          <div>
            <p className="text-sm text-gray-500">Birthday:</p>
            {
              isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={e => setUserData(prev => ({
                    ...prev,
                    dob: e.target.value
                  }))}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              ) : (
                <p className="text-gray-800">{userData.dob}</p>
              )
            }
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        {
          isEdit
            ? <button
                onClick={() => setIsEdit(false)}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
              >
                Save Information
              </button>
            : <button
                onClick={() => setIsEdit(true)}
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
              >
                Edit
              </button>
        }
      </div>
    </div>
  )
}

export default MyProfile
