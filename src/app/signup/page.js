'use client';

import React, { useEffect, useRef } from 'react';
import { montserrat, poppins } from '../font';
import { gsap } from 'gsap';

const Page = () => {
  const textRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      {
        y: 350,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: 'expo.out',
        duration: 1.3,
        onComplete: slideleft,
      }
    );

    function slideleft() {
      gsap.fromTo(
        textRef.current,
        {
          y: 0,
          x: 0,
        },
        {
          x: -300,
          ease: 'power3.out',
          duration: 1.5,
          onComplete: create,
        }
      );
    }


    function create() {
      gsap.fromTo(
        textRef1.current,
        {
          y: 30,
          x: 200,
          opacity: 0,
        },
        {
          y: 0,
          x: 200,
          opacity: 1,
          ease: 'expo.out',
          duration: 0.6,
          onComplete: edit,
        }
      );
    }

    function edit() {
      gsap.fromTo(
        textRef2.current,
        {
          y: -30,
          x: 200,
          opacity: 0,
        },
        {
          y: 0,
          x: 200,
          opacity: 1,
          ease: 'expo.out',
          duration: 0.6,
          onComplete: post,
        }
      );
    }

    function post() {
      gsap.fromTo(
        textRef3.current,
        {
          y: 30,
          x: 200,
          opacity: 0,
        },
        {
          y: 0,
          x: 200,
          opacity: 1,
          ease: 'expo.out',
          duration: 0.6,
          onComplete: fadeout,
        }
      );
    }


    function fadeout() {
      gsap.fromTo(textRef1.current, { opacity: 1 }, { opacity: 0, ease: 'power4.out', duration: 0.1 });
      gsap.fromTo(textRef2.current, { opacity: 1 }, { opacity: 0, ease: 'power4.out', duration: 0.1 });
      gsap.fromTo(textRef3.current, {
        opacity: 1,
      }, {
        opacity: 0,
        ease: 'power4.out',
        duration: 0.1,
        onComplete: slideright,
      });
    }

    function slideright() {
      gsap.fromTo(
        textRef.current,
        {
          x: -300,
          y: 0,
          opacity: 1,
        },
        {
          x: 300,
          y: 0,
          ease: 'expo.out',
          duration: 3,
        }
      );
    }
  }, []);

  return (
    <div className='relative w-full h-screen flex'>
      <div className='w-1/2 h-full px-10 py-20 flex flex-col items-center justify-between  border-r-2 border-black'>

        <div className='w-full mb-4'>
          <h1 className={`${poppins.className} text-4xl font-mediums text-center`}>
            BlogPress
          </h1>
        </div>

        <div className='w-full flex flex-col items-center justify-center gap-5'>
          <div className='w-[50%] flex items-center justify-between bg-gray-200 rounded-md'>
            <div className='text-center w-1/2 py-2 font-medium bg-black text-white rounded-md'>SignUp</div>
            <div className='text-center w-1/2 py-2 font-medium'>Login</div>
          </div>
          <div>
            Create Account Your at BlogPress, To Access Varied Content!!
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
          <div> Already Have A Account On BlogPress?</div>
          <div className='font-bold'>Sign In</div>
        </div>

      </div>

      {/* Right Side */}
      <div className='w-1/2 h-full flex items-center justify-center opacity-0'>
        <p className='text-xl font-medium'>Right Side</p>
      </div>



      {/* Centered Animation Layer */}
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-50'>
        <div className='relative text-7xl font-medium flex items-center justify-center'>
          <p ref={textRef} className={`${poppins.className} opacity-0 absolute z-100`}>BlogPress</p>
          <p ref={textRef1} className={`${poppins.className} opacity-0`}>Create.</p>
          <p ref={textRef2} className={`${poppins.className} opacity-0`}>Edit.</p>
          <p ref={textRef3} className={`${poppins.className} opacity-0`}>Post.</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
