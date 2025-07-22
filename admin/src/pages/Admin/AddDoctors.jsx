import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const AddDoctors = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const {backendUrl, aToken} = useContext(AdminContext)

  const onSubmitHandler = async () => {
    event.preventDefault();

    try {

      if(!docImg){
        return toast.error("Image Not Selected")
      }

      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({line1:address1, line2:address2}))

      formData.forEach((value, key)=>{
        console.log(`${key} : ${value}`);
      })


      const {data} = await axios.post(`http://localhost:3000/api/admin/add-doctor`, formData, {headers: {aToken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
        
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      toast.error(error.message)
      console.log("Error :" , error);
      
    }
  }

  return (
    <form className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-10 py-8 border border-gray-400 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img" className='cursor-pointer'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
          <p>Upload Doctor <br />Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input value={name} onChange={(e) => setName(e.target.value)} className='border border-gray-500 rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div>
              <p className='flex-1 flex flex-col gap-1'>Doctor Email</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-500 rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>

            <div>
              <p className='flex-1 flex flex-col gap-1'>Doctor Password</p>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='border border-gray-500 rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>

            <div>
              <p className='flex-1 flex flex-col gap-1'>Experience</p>
              <select value={experience} onChange={(e) => setExperience(e.target.value)} className='border border-gray-500 rounded px-3 py-2'>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div>
              <p className='flex-1 flex flex-col gap-1'>Doctor Fees</p>
              <input value={fees} onChange={(e) => setFees(e.target.value)} className='border border-gray-500 rounded px-3 py-2' type="number" placeholder='Fees' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div>
              <p className='text-sm text-gray-700 mb-1'>Speciality</p>
              <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className='w-full border px-3 py-2 rounded text-sm'>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className='text-sm text-gray-700 mb-1'>Education</p>
              <input value={degree} onChange={(e) => setDegree(e.target.value)} type="text" placeholder='Education' required className='border border-gray-500 rounded px-3 py-2' />
            </div>

            <div>
              <p className='text-sm text-gray-700 mb-1'>Address</p>
              <input value={address1} onChange={(e) => setAddress1(e.target.value)} type="text" placeholder='Address 1' required className='border border-gray-500 mb-[7px] rounded px-3 py-2' />
              <input value={address2} onChange={(e) => setAddress2(e.target.value)} type="text" placeholder='Address 2' required className='border border-gray-500 rounded px-3 py-2' />
            </div>
          </div>
        </div>

        <div>
          <p className='text-sm text-gray-700 '>About Doctor</p>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={5} placeholder='Write about doctor...' required className='w-full border border-gray-500 rounded px-4 pt-2' />
        </div>

        <button onClick={onSubmitHandler} type='submit' className='bg-[#5F6FFF] px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctors
