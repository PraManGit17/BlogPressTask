'use client';

import React, { useEffect, useRef, useState } from 'react';
import { montserrat, poppins } from '../font';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SignUppage = () => {
  const textRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const rightSideref = useRef(null);
  const leftSideref = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      mobileAnimation();
    } else {
      desktopAnimation();
    }

    function mobileAnimation() {
      gsap.fromTo(
        textRef.current,
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'expo.out',
          duration: 1,
          onComplete: () => {
            gsap.fromTo(
              [textRef1.current, textRef2.current, textRef3.current],
              { opacity: 0, y: 80 },
              {
                opacity: 1,
                y: 50,
                stagger: 0.4,
                ease: 'power2.out',
                duration: 0.8,
                onComplete: () => {
                  gsap.to([textRef1.current, textRef2.current, textRef3.current], {
                    opacity: 0,
                    delay: 1,
                    duration: 0.4,
                    onComplete: () => {
                      gsap.to(textRef.current, {
                        y: -150,
                        opacity: 0,
                        ease: 'expo.inOut',
                        duration: 1,
                        onComplete: showSides,
                      });
                    },
                  });
                },
              }
            );
          },
        }
      );
    }

    function desktopAnimation() {
      gsap.fromTo(
        textRef.current,
        { y: 350, opacity: 0 },
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
          { y: 0, x: 0 },
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
          { y: 30, x: 200, opacity: 0 },
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
          { y: -30, x: 200, opacity: 0 },
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
          { y: 30, x: 200, opacity: 0 },
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
        gsap.to([textRef1.current, textRef2.current, textRef3.current], {
          opacity: 0,
          duration: 0.1,
          ease: 'power4.out',
          onComplete: slideright,
        });
      }

      function slideright() {
        gsap.fromTo(
          textRef.current,
          { x: -300, y: 0, opacity: 1 },
          {
            x: 0,
            y: 0,
            ease: 'expo.out',
            duration: 3,
            onComplete: final,
          }
        );
      }

      function final() {
        gsap.to(textRef.current, {
          opacity: 0,
          ease: 'expo.out',
          duration: 0.5,
        });
        showSides();
      }
    }

    function showSides() {
      gsap.to([leftSideref.current, rightSideref.current], {
        opacity: 1,
        duration: 1,
        stagger: 0.2,
      });
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } else {
      setError(data.error || 'SignUp Failed');
      alert(`${data.error}. Try Login Else`);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row">
      <div
        ref={leftSideref}
        className="w-full md:w-1/2 h-1/2 md:h-full px-6 md:px-10 py-10 md:py-20 flex flex-col items-center justify-between opacity-0"
      >
        <div className="w-full mb-4">
          <h1 className={`${poppins.className} text-3xl md:text-4xl font-medium text-center`}>
            BlogPress
          </h1>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-5">
          <div className="w-[90%] md:w-[50%] flex items-center justify-between bg-gray-200 rounded-md">
            <div className="text-center w-1/2 py-2 font-medium bg-black text-white rounded-md">SignUp</div>
            <div className="text-center w-1/2 py-2 font-medium">Login</div>
          </div>
          <div className="text-center px-2">
            Create Account Your at BlogPress, To Access Varied Content!!
          </div>
        </div>

        <form className="flex flex-col items-center justify-center w-full gap-8 mt-4 md:mt-0">
          <div className="w-[85%] md:w-[60%] flex flex-col justify-center gap-1">
            <label className={`${poppins.className} font-medium text-md`}>Email :</label>
            <input
              name="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg w-full placeholder:font-medium text-gray-800"
            />
          </div>

          <div className="w-[85%] md:w-[60%] flex flex-col justify-center gap-1">
            <label className={`${poppins.className} font-medium text-md`}>Password :</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg w-full placeholder:font-medium text-gray-800"
            />
          </div>

          <button
            type="button"
            className={`${poppins.className} bg-black text-white text-lg font-medium p-2 w-[85%] md:w-[60%] rounded-md`}
            onClick={handleSignUp}
          >
            {loading ? (
              <>
                <span>Signing Up...</span>
                <span className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className={`${montserrat.className} text-sm flex items-center gap-2 mt-6`}>
          <div> Already Have A Account On BlogPress?</div>
          <div
            className="font-bold underline cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Sign In
          </div>
        </div>
      </div>

      <div
        ref={rightSideref}
        className="w-full md:w-1/2 h-1/2 md:h-full flex items-start justify-center py-8 opacity-0"
      >
        <div className="w-full md:w-[400px] lg:w-[500px] mx-auto">
          <Image
            src="/images/signup.png"
            alt="Signup Illustration"
            width={500}
            height={400}
            className="rounded-2xl object-contain mt-20"
            priority
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
            {/* <button
              onClick={() => router.push('/login')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            > */}
              Redirecting To Homepage
            {/* </button> */}
          </div>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <div className="relative text-4xl md:text-7xl font-medium flex items-center justify-center">
          <p ref={textRef} className={`${poppins.className} opacity-0 absolute z-100`}>BlogPress</p>
          <p ref={textRef1} className={`${poppins.className} opacity-0`}>Create.</p>
          <p ref={textRef2} className={`${poppins.className} opacity-0`}>Edit.</p>
          <p ref={textRef3} className={`${poppins.className} opacity-0`}>Post.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUppage;


