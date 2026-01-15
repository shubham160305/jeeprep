'use client';

import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/header';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DoubtsPage() {
  // ✅ ALL HOOKS FIRST — NO CONDITIONS ABOVE THIS
  const { data: session, status } = useSession();

  const [subject, setSubject] = useState('Physics');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Redirect handled INSIDE useEffect
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
  }, [status]);

  const askDoubt = async () => {
    setLoading(true);
    setAnswer('');

    const res = await fetch('/api/doubts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, question }),
    });

    const data = await res.json();
    setAnswer(data.answer || 'No answer generated');
    setLoading(false);
  };

  // ✅ Safe loading state AFTER hooks
  if (status === 'loading') return null;
  if (!session) return null;

  return (
    <AppShell>
      <div className="flex min-h-screen flex-col">
        <Header
          title="Doubt Solver"
          description="Ask AI any Physics, Chemistry, or Math doubt"
        />

        <main className="flex-1 p-6 space-y-4 max-w-3xl mx-auto w-full">
          <select
            className="border p-2 rounded w-full"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Maths</option>
          </select>

          <textarea
            className="border p-2 rounded w-full h-32"
            placeholder="Type your doubt here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            onClick={askDoubt}
            className="bg-primary text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Thinking...' : 'Ask Doubt'}
          </button>

          {answer && (
            <div className="border rounded p-4 bg-muted whitespace-pre-wrap">
              {answer}
            </div>
          )}
        </main>
      </div>
    </AppShell>
  );
}
