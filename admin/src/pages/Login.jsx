import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)

 const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    if (state === 'Admin') {
      const { data } = await axios.post('http://localhost:3000/api/admin/login-admin', {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem('aToken', data.token);
        console.log('Token:', data.token);
        setAToken(data.token); // ✅ Token ko context me set karo
      } else {
        console.log('Login failed');
        toast.error(data.message); // 🔥 Show toast on unsuccessful login
      }
    }
  } catch (error) {
    const msg = error.response?.data?.message || "Something went wrong";
    console.error('Login error:', msg);
    toast.error(msg); // 🔥 Show toast on API error
  }
};


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-[#5f65ff]'>{state}</span> Login
        </p>

        <div className='w-full'>
          <p>Email</p>
          <input
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#dadada] rounded w-full p-2 mt-1'
            type="email"
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#dadada] rounded w-full p-2 mt-1'
            type="password"
            required
          />
        </div>

        <button type="submit" className='bg-[#5f65ff] text-white w-full py-2 rounded-md text-base'>
          Login
        </button>

        {
          state === 'Admin'
            ? <p>Doctor Login? <span className='text-[#5f65ff] underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
            : <p>Admin Login? <span className='text-[#5f65ff] underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
