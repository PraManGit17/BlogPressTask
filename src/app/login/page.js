'use client';

import React, { useEffect, useRef, useState } from 'react';
import { montserrat, poppins } from '../font';
import { useRouter } from 'next/navigation';

const page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 8000)
    } else {
      alert('Invalid credentials');
    }
  };



  return (
    <div className='relative w-full h-screen flex'>

      <div className="w-1/2 h-full flex items-end justify-center py-8">
        <div className="w-[75%] h-full rounded-3xl overflow-hidden">
          <img
            src="/images/northern.jpg"
            alt="Logo"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>



      <div className='w-1/2 h-full px-10 py-20 flex flex-col items-center justify-between'>
        <div className='w-full mb-4'>
          <h1 className={`${poppins.className} text-4xl font-mediums text-center`}>
            BlogPress
          </h1>
        </div>

        <div className='w-full flex flex-col items-center justify-center gap-5'>
          <div className='w-[50%] flex items-center justify-between bg-gray-200 rounded-md'>
            <div className='text-center w-1/2 py-2 font-medium'>SignUp</div>
            <div className='text-center w-1/2 py-2 font-medium  bg-black text-white rounded-md'>Login</div>
          </div>
          <div>
            Login Into Your Account, To Resume Exploring BlogPress!!
          </div>
        </div>

        <form className='flex flex-col items-center justify-center w-full gap-8'>
          <div className='w-[60%] flex flex-col justify-center gap-1'>
            <label className={`${poppins.className} font-medium text-md`}>
              Email :
            </label>
            <input
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter Your Email'
              className='px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg w-full 
        placeholder:font-medium text-gray-800'
            />
          </div>

          <div className='w-[60%] flex flex-col justify-center gap-1'>
            <label className={`${poppins.className} font-medium text-md`}>
              Password :
            </label>
            <input
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter Your Password'
              className='px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg w-full 
        placeholder:font-medium text-gray-800'
            />
          </div>

          <button className={`${poppins.className} bg-black text-white text-lg font-medium p-2 w-[60%] rounded-md`}
            onClick={handleLogin}>

            {loading ? (
              <>
                <span>
                  Signing In...
                </span>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className={`${montserrat.className} text-sm flex items-center gap-2`}>
          <div>Don&apos;t have an account?</div>
          <div className='font-bold underline cursor-pointer'
            onClick={() => router.push('/signup')}>Sign Up</div>
        </div>
      </div>

      {success && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/10 bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 animate-bounce-in">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className={`${poppins.className} text-lg font-semibold text-center`}>
              Account Successfully Logged In!
            </p>
            <button
              onClick={() => router.push('/')}
              className={` ${poppins.className} bg-black text-white px-4 py-2 rounded-md hover:shadow-lg transition`}
            >
              Visit BlogPress
            </button>
          </div>
        </div>
      )}

    </div >
  )
}

export default page
