'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function HeroSection() {
  const router = useRouter();
  const [slug, setSlug] = useState('');

  
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.6 } });
    tl.from(containerRef.current, { opacity: 0 })
      .from(headingRef.current, { y: 30, opacity: 0 }, '-=0.4')
      .from(textRef.current, { y: 20, opacity: 0 }, '-=0.4')
      .from(formRef.current, { y: 20, opacity: 0 }, '-=0.4');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (slug.trim() !== '') {
      router.push(`/posts/${slug.trim()}`);
    } else {
      alert('Field is Empty');
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center py-16 px-4 bg-white text-center"
    >
      <span className="text-sm font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full mb-4">
        Welcome To BlogPress
      </span>

      <h1
        ref={headingRef}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
      >
        Discover our latest blogs
      </h1>

      <p
        ref={textRef}
        className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm sm:text-base"
      >
        Discover some stories that set us apart. From groundbreaking realities to fictional stunners, we offer a wide-range of blogs.
      </p>


      <form
        ref={formRef}
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row sm:flex-nowrap items-center justify-center w-full max-w-lg gap-2"
      >
        <div className="relative w-full sm:flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Type a Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-gray-100 pl-10 pr-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="shrink-0 px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Find Now
        </button>
      </form>

    </section>
  );
}
