'use client';

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';


const Page = () => {

  const router = useRouter();
  const { slug } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        if (!res.ok) throw new Error("Post not found");

        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error(err.message);
        setTitle('Not Found');
        setContent('No content available.');
      }
    };

    fetchPost();

  }, [slug]);

  return (
    <div className="px-8 py-6 space-y-4 flex flex-col gap-4 h-screen">
      <div className='flex flex-col gap-2'>
        <h2 className="text-2xl font-bold">Your Blog:</h2>
        <label className='font-medium'>Blog Title: </label>
        <input
          value={title}
          className="border p-2 w-full rounded"
          readOnly
        />
      </div>

      <div className='flex flex-col gap-4 h-full'>
        <div className='font-medium'>Blog Content:</div>
        <div
          className="prose border p-4 rounded overflow-y-auto h-[50vh]"
          dangerouslySetInnerHTML={{ __html: content }}
        />


        <div className="flex gap-4">
          <button onClick={() => {
            router.push('/');
          }} className="bg-blue-500 text-white px-4 py-2 rounded">
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
