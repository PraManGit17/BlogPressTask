

'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useParams, useRouter } from 'next/navigation';

const Editform = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // content loading

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
      setInitialLoading(false);
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

  if (initialLoading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center flex-col gap-4 mt-10">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-700">Your content is being loaded...</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6 space-y-6 flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-xl md:text-2xl font-bold">Your Blog:</h2>
        <label className="font-medium text-sm md:text-base">Blog Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded text-sm md:text-base"
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="font-medium text-sm md:text-base">Blog Content:</div>
        <EditorContent editor={editor} className="border p-2 rounded min-h-[200px]" />
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm md:text-base"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm md:text-base"
          >
            Delete
          </button>
        </div>
      </div>

      {message && <p className="text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default Editform;
