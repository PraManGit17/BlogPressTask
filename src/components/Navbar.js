'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { montserrat, poppins } from '../app/font';

const Navbar = () => {
  const router = useRouter();
  const [showCard, setShowCard] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'GET' });
      if (res.ok) router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Post', route: '/admin/create' },
    { label: 'Activity', route: '/admin/activity' },
  ];

  return (
    <div className='relative px-6 py-4 border-b border-gray-300 flex items-center justify-between flex-wrap'>
   
      <div className={`${poppins.className} text-2xl font-bold text-gray-800`}>
        BlogPress
      </div>

      <div className='hidden sm:flex flex-row items-center justify-center gap-4 sm:gap-6'>
        {navLinks.map((item) => (
          <div
            key={item.label}
            onClick={() => router.push(item.route)}
            className={`${montserrat.className} text-base sm:text-lg font-medium text-gray-700 hover:text-blue-500 cursor-pointer transition`}
          >
            {item.label}
          </div>
        ))}


        <div className='relative'>
          <div
            onClick={() => setShowCard(true)}
            className={`${montserrat.className} text-base sm:text-lg font-medium text-gray-700 hover:text-blue-500 cursor-pointer transition`}
          >
            Follow
          </div>

          {showCard && (
            <div className="absolute top-10 left-0 z-20 w-72 sm:w-80 bg-white rounded-xl shadow-lg p-4 border text-sm sm:text-base animate-fadeIn">
              <button
                onClick={() => setShowCard(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-lg font-bold"
              >
                ×
              </button>
              <p className='text-gray-800 font-medium'>Hi there! 👋</p>
              <p className='text-gray-600 mt-1'>
                I'm <span className="font-semibold">Pratham Manjrekar</span>, the developer of BlogPress.
                I’d love to connect on LinkedIn!
              </p>
              <button
                className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700"
                onClick={() => window.open('https://www.linkedin.com/in/pratham-manjrekar-821b61291/', '_blank')}
              >
                Visit LinkedIn
              </button>
            </div>
          )}
        </div>
      </div>


      <div className='hidden sm:flex items-center gap-4'>
        <div className='w-9 h-9 rounded-full overflow-hidden border border-gray-300'>
          <Image
            src='/images/northern.jpg'
            alt='Profile'
            width={36}
            height={36}
            className='object-cover w-full h-full'
          />
        </div>
        <button
          onClick={handleLogout}
          className='bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer'
        >
          Logout
        </button>
      </div>


      <div className='sm:hidden'>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>


      {mobileMenuOpen && (
        <div className="w-full mt-4 sm:hidden flex flex-col gap-4 border-t pt-4">
          {navLinks.map((item) => (
            <div
              key={item.label}
              onClick={() => {
                router.push(item.route);
                setMobileMenuOpen(false);
              }}
              className={`${montserrat.className} text-base font-medium text-gray-700 hover:text-blue-500 cursor-pointer transition`}
            >
              {item.label}
            </div>
          ))}

          <div
            onClick={() => setShowCard(!showCard)}
            className={`${montserrat.className} text-base font-medium text-gray-700 hover:text-blue-500 cursor-pointer transition`}
          >
            Follow
          </div>


          {showCard && (
            <div className="relative w-full bg-white rounded-xl shadow-lg p-4 border text-sm animate-fadeIn">
              <button
                onClick={() => setShowCard(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-lg font-bold"
              >
                ×
              </button>
              <p className='text-gray-800 font-medium'>Hi there! 👋</p>
              <p className='text-gray-600 mt-1'>
                I'm <span className="font-semibold">Pratham Manjrekar</span>. Let’s connect on LinkedIn!
              </p>
              <button
                className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700"
                onClick={() => window.open('https://www.linkedin.com/in/pratham-manjrekar-821b61291/', '_blank')}
              >
                Visit LinkedIn
              </button>
            </div>
          )}


          <div className='w-9 h-9 rounded-full overflow-hidden border border-gray-300'>
            <Image
              src='/images/northern.jpg'
              alt='Profile'
              width={36}
              height={36}
              className='object-cover w-full h-full'
            />
          </div>


          <button
            onClick={handleLogout}
            className='bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
