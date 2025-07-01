'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';

const Page = () => {
  const router = useRouter();
  const { slug } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        if (!res.ok) throw new Error('Post not found');

        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error(err.message);
        setTitle('Not Found');
        setContent('No content available.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const getSummary = (html) => {
    return html.replace(/<[^>]*>/g, '').slice(0, 150);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-lg font-medium text-gray-700">Content being loaded...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={getSummary(content)} />
      </Head>

      <div className="px-4 md:px-8 py-6 space-y-4 flex flex-col gap-4 min-h-screen">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <div className="flex flex-col gap-4 flex-grow">
          <div
            className="prose border p-4 rounded overflow-y-auto max-h-[50vh]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
