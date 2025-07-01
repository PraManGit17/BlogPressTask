'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef([]);

  const images = ['northern.jpg', 'cover1.jpeg', 'cover.jpeg', 'cover3.jpeg', 'cover7.jpeg', 'cover6.jpeg' , 'cover4.jpeg'];

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/activity');
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!loading && cardsRef.current) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, [loading]);

  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div className="w-full min-h-[89vh] bg-gray-100 p-4 md:p-6 flex flex-col items-start gap-6 md:gap-8">
      <div className='text-lg md:text-xl font-medium px-2 md:px-4'>
        Blogs Created By You on BlogPress:
      </div>

      {loading ? (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="w-full bg-white border rounded-2xl shadow-md p-4 md:p-6 flex flex-col md:flex-row gap-6 transition-opacity duration-300">
          <div
            className="w-full md:w-1/6 bg-gray-50 border rounded-xl flex items-center justify-center text-base md:text-lg font-semibold py-4"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <Link href={`/admin/create`}>Add a New Blog</Link>
          </div>

          <hr className='hidden md:block h-full border border-gray-400'></hr>

          <div className="w-full flex flex-wrap gap-4 justify-start items-start">
            {posts.map((post, index) => {
              const img = getRandomImage();
              return (
                <Link
                  key={post._id}
                  href={`/admin/activity/${post.slug}`}
                  ref={(el) => (cardsRef.current[index + 1] = el)} // +1 to skip "Add a New Blog"
                  className="w-[47%] sm:w-[30%] md:w-[22%] lg:w-[18%] min-w-[150px] max-w-[200px] h-[240px] bg-white border rounded-xl flex flex-col items-center p-2 text-sm font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-full h-[80%] rounded-xl overflow-hidden">
                    <Image
                      src={`/images/${img}`}
                      alt="Blog Thumbnail"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="w-full h-[20%] flex items-center justify-center text-xs md:text-sm text-center px-1">
                    {post.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
