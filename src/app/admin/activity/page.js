'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/activity');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, [])

  return (
    <div className="w-full h-[89vh] bg-gray-100 p-6 flex flex-col items-start gap-8">
      <div className='text-xl font-medium px-4'>Blogs Created By You on BlogPress:</div>

      <div className="w-full h-[50vh] bg-white border rounded-2xl shadow-md p-6 flex gap-6">
        <div className="w-1/6 bg-gray-50 border rounded-xl flex items-center justify-center text-lg font-semibold">
          <Link href={`/admin/create`}>
            Add a New Blog
          </Link>
        </div>

        <hr className='h-full border-gray-500 border'></hr>

        <div className="w-full h-full rounded-xl flex gap-4 flex-wrap">
          {posts.map((post) => (
            <Link
              key={post._id}
              className="w-1/6 min-w-[180px] h-full bg-white border rounded-xl flex flex-col items-center p-2 text-lg font-semibold"
              href={`/admin/activity/${post.slug}`}
            >

              <div className="w-full h-[85%] rounded-xl overflow-hidden">
                <Image
                  src="/images/northern.jpg"
                  alt="Blog Thumbnail"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="w-full h-[15%] flex items-center justify-center text-sm text-center px-1">

                {post.title}

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>


  )
}

export default Page;
