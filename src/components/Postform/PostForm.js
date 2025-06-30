'use client';

import React, { useEffect, useState } from 'react';
import slugify from 'slugify';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { montserrat } from '@/app/font';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your amazing blog post here...",
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-400 before:absolute before:top-2 before:left-2 before:pointer-events-none',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose max-w-none w-full min-h-[200px] p-2 outline-none',
      },
    },
    content: '',
  });

  useEffect(() => {
    setSlug(slugify(title, { lower: true, strict: true }));
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          content: editor?.getHTML(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setMessage('Post created successfully!');
      
      setTitle('');
      editor?.commands.setContent('');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white w-full h-[76vh] rounded-2xl shadow-lg shadow-gray-400 flex flex-col gap-8 px-4 py-4'>

      <div className={`${montserrat.className} flex items-center justify-start px-6 py-1 text-lg w-full border-2 rounded-lg`}>
       BlogPress / Create-Blog
      </div>

      <form onSubmit={handleSubmit} className='flex items-center justify-between w-full h-full'>
        <div className='w-[40%] h-full border-r-2 border-gray-300 flex flex-col items-center justify-center gap-8'>
          <div className='w-[80%]'>
            <label className="block font-medium mb-1 text-2xl ml-1">Title :</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="block font-normal mt-1 ml-5 text-sm">Enter Your Blog's Title</div>
          </div>

          <div className='w-[80%]'>
            <label className="block font-medium mb-1 text-2xl ml-1">Slug :</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 bg-gray-50"
              value={slug}
              readOnly
            />
            <div className="block font-normal mt-1 ml-5 text-sm">Auto-generated slug</div>
          </div>

          <div className='w-[80%] flex flex-col gap-2 items-center justify-center'>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>

            {message && <p className="mt-2 text-sm">{message}</p>}
          </div>
        </div>

        <div className='w-[60%] h-full flex items-start justify-center py-4 mb-8'>
          <div className='w-full px-4 h-full'>
            <div className="block font-medium mb-1 text-2xl ml-1">Blog's Content :</div>
            <div className="relative border rounded-md min-h-[250px] h-full overflow-y-auto focus-within:ring-2 focus-within:ring-blue-500 px-2 py-1">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
