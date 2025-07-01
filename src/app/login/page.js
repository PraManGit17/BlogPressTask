

// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { montserrat, poppins } from '../font';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// const Loginpage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const res = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     setLoading(false);

//     if (res.ok) {
//       setSuccess(true);
//       setTimeout(() => {
//         router.push('/');
//       }, 8000);
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className='relative w-full h-screen flex flex-col md:flex-row'>

//       <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-end justify-center py-8">
//         <div className="w-[90%] max-w-[400px] md:max-w-[500px] rounded-3xl overflow-hidden">
//           <Image
//             src="/images/login.png"
//             alt="Login"
//             width={500}
//             height={400}
//             className="w-full h-auto object-contain rounded-2xl mb-20"
//             priority
//           />
//         </div>
//       </div>




//       <div className='w-full md:w-1/2 h-1/2 md:h-full px-6 md:px-10 py-10 md:py-20 flex flex-col items-center justify-between'>
//         <div className='w-full mb-4'>
//           <h1 className={`${poppins.className} text-4xl font-mediums text-center`}>
//             BlogPress
//           </h1>
//         </div>

//         <div className='w-full flex flex-col items-center justify-center gap-5'>
//           <div className='w-full md:w-[50%] flex items-center justify-between bg-gray-200 rounded-md'>
//             <div className='text-center w-1/2 py-2 font-medium'>SignUp</div>
//             <div className='text-center w-1/2 py-2 font-medium bg-black text-white rounded-md'>Login</div>
//           </div>
//           <div className='text-center px-4'>
//             Login Into Your Account, To Resume Exploring BlogPress!!
//           </div>
//         </div>

//         <form className='flex flex-col items-center justify-center w-full gap-8'>
//           <div className='w-full md:w-[60%] flex flex-col justify-center gap-1'>
//             <label className={`${poppins.className} font-medium text-md`}>
//               Email :
//             </label>
//             <input
//               name='email'
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               placeholder='Enter Your Email'
//               className='px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg w-full placeholder:font-medium text-gray-800'
//             />
//           </div>

//           <div className='w-full md:w-[60%] flex flex-col justify-center gap-1'>
//             <label className={`${poppins.className} font-medium text-md`}>
//               Password :
//             </label>
//             <input
//               name='password'
//               type='password'
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               placeholder='Enter Your Password'
//               className='px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg w-full placeholder:font-medium text-gray-800'
//             />
//           </div>

//           <button
//             className={`${poppins.className} bg-black text-white text-lg font-medium p-2 w-full md:w-[60%] rounded-md`}
//             onClick={handleLogin}
//           >
//             {loading ? (
//               <>
//                 <span>Signing In...</span>
//                 <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block ml-2"></span>
//               </>
//             ) : (
//               'Sign In'
//             )}
//           </button>
//         </form>

//         <div className={`${montserrat.className} text-sm flex items-center gap-2`}>
//           <div>Don&apos;t have an account?</div>
//           <div
//             className='font-bold underline cursor-pointer'
//             onClick={() => router.push('/signup')}
//           >
//             Sign Up
//           </div>
//         </div>
//       </div>

//       {success && (
//         <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/10 bg-opacity-60 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 animate-bounce-in">
//             <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
//               <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <p className={`${poppins.className} text-lg font-semibold text-center`}>
//               Account Successfully Logged In!
//             </p>
//             <button
//               onClick={() => router.push('/')}
//               className={` ${poppins.className} bg-black text-white px-4 py-2 rounded-md hover:shadow-lg transition`}
//             >
//               Visit BlogPress
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Loginpage;


'use client';

import React, { useEffect, useRef, useState } from 'react';
import { montserrat, poppins } from '../font';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // 🌟 Refs for animation targets
  const imageRef = useRef(null);
  const formRef = useRef(null);

  // 🌟 GSAP on mount animation
  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );
    gsap.fromTo(
      formRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out' }
    );
  }, []);

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
      }, 8000);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='relative w-full h-screen flex flex-col md:flex-row'>

      {/* Left image section with animation */}
      <div ref={imageRef} className="w-full md:w-1/2 h-1/2 md:h-full flex items-end justify-center py-8">
        <div className="w-[90%] max-w-[400px] md:max-w-[500px] rounded-3xl overflow-hidden">
          <Image
            src="/images/login.png"
            alt="Login"
            width={500}
            height={400}
            className="w-full h-auto object-contain rounded-2xl mb-20"
            priority
          />
        </div>
      </div>

      {/* Right form section with animation */}
      <div
        ref={formRef}
        className='w-full md:w-1/2 h-1/2 md:h-full px-6 md:px-10 py-10 md:py-20 flex flex-col items-center justify-between'
      >
        <div className='w-full mb-4'>
          <h1 className={`${poppins.className} text-4xl font-mediums text-center`}>
            BlogPress
          </h1>
        </div>

        <div className='w-full flex flex-col items-center justify-center gap-5'>
          <div className='w-full md:w-[50%] flex items-center justify-between bg-gray-200 rounded-md'>
            <div className='text-center w-1/2 py-2 font-medium'>SignUp</div>
            <div className='text-center w-1/2 py-2 font-medium bg-black text-white rounded-md'>Login</div>
          </div>
          <div className='text-center px-4'>
            Login Into Your Account, To Resume Exploring BlogPress!!
          </div>
        </div>

        <form className='flex flex-col items-center justify-center w-full gap-8'>
          <div className='w-full md:w-[60%] flex flex-col justify-center gap-1'>
            <label className={`${poppins.className} font-medium text-md`}>
              Email :
            </label>
            <input
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter Your Email'
              className='px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg w-full placeholder:font-medium text-gray-800'
            />
          </div>

          <div className='w-full md:w-[60%] flex flex-col justify-center gap-1'>
            <label className={`${poppins.className} font-medium text-md`}>
              Password :
            </label>
            <input
              name='password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter Your Password'
              className='px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg w-full placeholder:font-medium text-gray-800'
            />
          </div>

          <button
            className={`${poppins.className} bg-black text-white text-lg font-medium p-2 w-full md:w-[60%] rounded-md`}
            onClick={handleLogin}
          >
            {loading ? (
              <>
                <span>Signing In...</span>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block ml-2"></span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className={`${montserrat.className} text-sm flex items-center gap-2`}>
          <div>Don&apos;t have an account?</div>
          <div
            className='font-bold underline cursor-pointer'
            onClick={() => router.push('/signup')}
          >
            Sign Up
          </div>
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
    </div>
  );
};

export default Loginpage;
