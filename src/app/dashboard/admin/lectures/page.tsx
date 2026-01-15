'use client';

import { useState } from 'react';

export default function AdminLecturesPage() {
  const [title, setTitle] = useState('');
  const [videoId, setVideoId] = useState('');
  const [chapterId, setChapterId] = useState('');

  const createLecture = async () => {
    await fetch('/api/admin/lectures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        videoId,      // 👈 YouTube video ID
        chapterId,
      }),
    });

    alert('Lecture created');
  };

  return (
    <div className="p-6 space-y-4 max-w-lg">
      <h1 className="text-xl font-bold">Create Lecture</h1>

      <input
        placeholder="Lecture Title"
        className="border p-2 w-full"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="YouTube Video ID (eg: 7USkqjn6QkU)"
        className="border p-2 w-full"
        onChange={(e) => setVideoId(e.target.value)}
      />

      <input
        placeholder="Chapter ID"
        className="border p-2 w-full"
        onChange={(e) => setChapterId(e.target.value)}
      />

      <button
        onClick={createLecture}
        className="bg-primary text-white px-4 py-2"
      >
        Save Lecture
      </button>
    </div>
  );
}
