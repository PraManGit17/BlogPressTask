'use client'

import React from 'react'
import { montserrat, poppins } from '../app/font';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='px-8 py-5 border-b border-gray-500 flex items-center justify-between'>
      
      {/* Logo */}
      <div className={`${poppins.className} font-semibold text-3xl`}>
        BlogPress
      </div>

      {/* Menu + Profile + Button */}
      <div className='flex items-center justify-center gap-8'>

        {/* Nav Items */}
        <div className={`${montserrat.className} flex items-center justify-center gap-5 text-lg font-medium`}>
          {['Home', 'Post', 'Activity', 'Follow'].map((item, index) => (
            <div
              key={index}
              className='transition-all duration-200 hover:text-blue-500 hover:-translate-x-3 hover:ml-3 hover:scale-105 cursor-pointer'
            >
              {item}
            </div>
          ))}
        </div>

        {/* Profile + Logout */}
        <div className='flex items-center justify-center gap-8'>

          {/* Profile Image */}
          <div className='w-10 h-10 rounded-full overflow-hidden border border-gray-400'>
            <Image
              src="/images/northern.jpg"
              alt="Profile"
              width={40}
              height={40}
              className='object-cover w-full h-full cursor-pointer'
            />
          </div>

          {/* Logout Button */}
          <div>
            <button className='bg-blue-500 text-white font-medium px-3 py-1 rounded hover:bg-blue-600 transition-colors'>
              Logout
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Navbar;
