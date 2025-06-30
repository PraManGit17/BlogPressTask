'use client';

import React, { useEffect, useRef, useState } from 'react';
import { montserrat, poppins } from '../font';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
  const textRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const rightSideref = useRef(null);
  const leftSideref = useRef(null);

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
          onComplete: final,
        }
      );
    }

    function final() {
      gsap.fromTo(
        textRef.current,
        {
          x: 300,
          y: 0,
          opacity: 1,
        },
        {
          x: 300,
          y: -250,
          ease: 'expo.out',
          duration: 2,
          color: 'white',
        }
      );

      gsap.fromTo(
        rightSideref.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
        }
      );

      gsap.fromTo(
        leftSideref.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
        }
      );


    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();


  const handleSignUp = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError('');
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email,
        password
      }),
    });

    const data = await res.json();
    setLoading(false);


    if (res.ok) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 8000)
    }
    else {
      setError(data.error || 'SignUp Failed');
      alert(`${data.error}. Try Login Else`);
    }
  }

  return (
    <div className='relative w-full h-screen flex'>

      <div ref={leftSideref} className='w-1/2 h-full px-10 py-20 flex flex-col items-center justify-between opacity-0'>

        <div className='w-full mb-4'>
          <h1 className={`${poppins.className} text-4xl font-medium text-center`}>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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

          <button
            type="button"
            className={`${poppins.className} bg-black text-white text-lg font-medium p-2 w-[60%] rounded-md`}
            onClick={handleSignUp}>

            {loading ? (
              <>
                <span>
                  Signing Up...
                </span>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className={`${montserrat.className} text-sm flex items-center gap-2`}>
          <div> Already Have A Account On BlogPress?</div>
          <div className='font-bold underline cursor-pointer'
            onClick={() => router.push('/login')}>Sign In</div>
        </div>

      </div>

      <div ref={rightSideref} className="w-1/2 h-full flex items-start justify-center py-8 opacity-0">
        <div className="w-[75%] h-full rounded-3xl overflow-hidden">
          <img
            src="/images/northern.jpg"
            alt="Logo"
            className="w-full h-full object-cover rounded-2xl"
          />
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
              Account Successfully Created!
            </p>
            <button
              onClick={() => router.push('/login')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

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
