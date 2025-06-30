'use client';

import React, { useEffect, useRef } from 'react';
import { montserrat, poppins } from '../font';


const page = () => {
  return (
    <div className='relative w-full h-screen flex'>

      <div className='w-1/2 h-full flex items-center justify-center  border-r-2 border-black'>
        hi
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
              placeholder='Enter Your Password'
              className='px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg w-full 
        placeholder:font-medium text-gray-800'
            />
          </div>

          <button className={`${poppins.className} bg-black text-white text-lg font-medium p-2 w-[60%] rounded-md`}>
            Sign In
          </button>
        </form>

        <div className={`${montserrat.className} text-sm flex items-center gap-2`}>
          <div>Don&apos;t have an account?</div>
          <div className='font-bold'>Sign Up</div>
        </div>

      </div>

    </div>
  )
}

export default page
