import React, { useState } from 'react'
import { assets } from '../assets/assets';

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name:"Abubakar",
    image:assets.profile_pic,
    email:"abubakarmujahid980@gmail.com",
    phone:"+1 234 567 890",
    address:{
      line1:"57th Cross, Richmond",
      line2:"Circle, Church Road, London",
    },
    gender:"Male",
    dob:"23-09-2002"
  });

  const [isEdit, setIsEdit] = useState(true)

  return (
    <div>
      <img src={userData.image} alt="" />

      {
        isEdit ? <input type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))}/> : <p>{userData.name}</p>
      }

      <hr />
      <div>
        <p>CONTACT INFORMATION</p>
        <div>
          <p>Email id:</p>
          <p>{userData.email}</p>
          <p>Phone:</p>
          {
            isEdit ? <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))}/> : <p>{userData.phone}</p>
          }
        </div>
        <p>Address</p>
          {
            isEdit ? <p>
              <input type="text" value={userData.address.line1} onChange={e => setUserData(prev => ({...prev, address: {...prev.address, line1:e.target.value}}))}/>
              <br />
              <input type="text" value={userData.address.line2} onChange={e => setUserData(prev => ({...prev, address: {...prev.address, line2:e.target.value}}))}/>
            </p>
            : <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
      </div>

        <div>
          <p>BASIC INFORMATION</p>
          <div>
            <p>Gender:</p>
            {
              isEdit ? <select onChange={(e)=> setUserData(prev => ({...prev, gender: e.target.value}))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select> 
              : 
              <p>{userData.gender}</p>
            }
          </div>
        </div>
    </div>
  )
}

export default MyProfile
