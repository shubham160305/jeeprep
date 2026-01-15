'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminSubjectsPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState([]);

  if (status === 'loading') return null;
  if (!session || session.user.role !== 'admin') redirect('/dashboard/student');

  useEffect(() => {
    fetch('/api/subjects')
      .then(res => res.json())
      .then(setSubjects);
  }, []);

  const createSubject = async () => {
    await fetch('/api/admin/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setName('');
    location.reload();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Subjects</h1>

      <input
        className="border p-2 w-full"
        placeholder="Subject name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button onClick={createSubject} className="bg-primary px-4 py-2 text-white">
        Create Subject
      </button>

      <ul className="space-y-2">
        {subjects.map((s: any) => (
          <li key={s.id} className="border p-2">{s.name}</li>
        ))}
      </ul>
    </div>
  );
}
