

'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const images = ['northern.jpg', 'cover1.jpeg', 'cover.jpeg', 'cover3.jpeg', 'cover4.jpeg', 'cover6.jpeg', 'cover7.jpeg'];

  return (
    <div className="w-full bg-gray-100 py-8 px-4 md:px-8">
      <h2 className="text-2xl font-semibold mb-6">Latest Blogs</h2>

      {loading ? (
        <div className="w-full h-[40vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="w-full h-[30vh] flex items-center justify-center text-gray-500 text-lg">
          No Blogs Available
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {posts.map((post, index) => {
            const img = images[index % images.length]; // rotate images
            return (
              <Link
                key={post._id}
                href={`/posts/${post.slug}`}
                className="bg-white rounded-xl shadow hover:shadow-md transition duration-300"
              >
                <div className="w-full h-40 rounded-t-xl">
                  <Image
                    src={`/images/${img}`}
                    alt="Blog Cover"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover overflow-hidden rounded-t-xl"
                  />
                </div>
                <div className="p-3 text-center text-sm font-medium">{post.title}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostList;
