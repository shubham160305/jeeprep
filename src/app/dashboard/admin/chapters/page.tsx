'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminChaptersPage() {
  const { data: session, status } = useSession();
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState('');
  const [title, setTitle] = useState('');

  if (status === 'loading') return null;
  if (!session || session.user.role !== 'admin') redirect('/dashboard/student');

  useEffect(() => {
    fetch('/api/subjects')
      .then(res => res.json())
      .then(setSubjects);
  }, []);

  const createChapter = async () => {
    await fetch('/api/admin/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectId, title }),
    });
    setTitle('');
    alert('Chapter created');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Chapters</h1>

      <select
        className="border p-2 w-full"
        onChange={e => setSubjectId(e.target.value)}
      >
        <option value="">Select Subject</option>
        {subjects.map((s: any) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <input
        className="border p-2 w-full"
        placeholder="Chapter title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <button onClick={createChapter} className="bg-primary px-4 py-2 text-white">
        Create Chapter
      </button>
    </div>
  );
}
