'use client';

import React from 'react'
import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useParams, useRouter } from 'next/navigation';

const Editform = () => {

  const { slug } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/activity/${slug}`);
      const data = await res.json();
      setTitle(data.title);
      editor?.commands.setContent(data.content);
    };

    if (editor) {
      fetchPost();
    }
  }, [editor, slug]);

  const handleUpdate = async () => {
    setLoading(true);
    const res = await fetch(`/api/activity/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content: editor?.getHTML() }),
    });
    const data = await res.json();
    setMessage(data.error || 'Post updated');
    setLoading(false);
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    const res = await fetch(`/api/activity/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/admin/activity');
    } else {
      const data = await res.json();
      setMessage(data.error);
    }
  };

  return (
    <div className="px-8 py-6 space-y-4 flex flex-col gap-4">
      <div className='flex flex-col gap-2'>
        <h2 className="text-2xl font-bold">Your Blog:</h2>
        <label className='font-medium'>Blog Title: </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>
      <div className='flex flex-col gap-4'>
        <div className='font-medium'>Blog Content:</div>
        <EditorContent editor={editor} className="border p-2 rounded min-h-[200px]" />
        <div className="flex gap-4">
          <button onClick={handleUpdate} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Updating...' : 'Update'}
          </button>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
      {message && <p className="text-sm text-red-500">{message}</p>}
    </div>
  )
}

export default Editform
