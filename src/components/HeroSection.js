'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HeroSection() {
  const router = useRouter();
  const [slug, setSlug] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form reload

    if (slug.trim() !== '') {
      router.push(`/posts/${slug.trim()}`);
    } else {
      alert('Field is Empty');
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-white text-center">
      <span className="text-sm font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full mb-4">
        Welcome To BlogPress
      </span>

      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
        Discover our latest blogs
      </h1>

      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Discover some stories that set us apart. From groundbreaking realities to fictional stunners, we offer a wide-range of blogs.
      </p>

      {/* Wrap input and button in a form */}
      <form onSubmit={handleSearch} className="flex items-center justify-center w-full max-w-lg gap-2">
        <div className="relative flex-grow">
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
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
          Find Now
        </button>
      </form>
    </section>
  );
}
