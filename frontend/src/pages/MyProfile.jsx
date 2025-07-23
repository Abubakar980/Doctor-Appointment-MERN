import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {assets} from '../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image', image)

      const {data} = await axios.post(`http://localhost:3000/api/user/update-profile`, formData,{headers:{token}})

      if(data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    userData && (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className="w-10 absolute bottom-12 right-12" src={image ? '' : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
          </label>
        ) : (
          <img
            src={userData.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        )}
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
          />
        ) : (
          <h2 className="text-2xl font-semibold">{userData.name}</h2>
        )}

        <hr className="my-6" />

        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-700">
            CONTACT INFORMATION
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email ID:</p>
              <p className="text-gray-800">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone:</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              ) : (
                <p className="text-gray-800">{userData.phone}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            ) : (
              <p className="text-gray-800">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <hr className="my-6" />

        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-700">
            BASIC INFORMATION
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Gender:</p>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-800">{userData.gender}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Birthday:</p>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      dob: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              ) : (
                <p className="text-gray-800">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
