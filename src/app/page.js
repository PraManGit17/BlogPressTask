'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import PostList from '@/components/PostList';
import Link from 'next/link';
import Footer from '@/components/Footer';

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <HeroSection />
      <PostList />

      {!loading && (
        <div className="w-full bg-white py-12 px-6 flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {posts.length === 0
              ? "Haven't written your first blog yet?"
              : 'Loving the blogging journey?'}
          </h2>
          <p className="text-gray-600 max-w-xl">
            {posts.length === 0
              ? "Don't wait! Share your thoughts, stories, or experiences today."
              : 'Why not share more of your thoughts with the world? Keep writing!'}
          </p>

          <Link
            href="/admin/create"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {posts.length === 0 ? 'Post a Blog' : 'Post More'}
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Page;