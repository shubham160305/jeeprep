'use client';

import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/header';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Chapter = {
  id: string;
  title: string;
};

export default function ChaptersPage() {
  const { subjectId } = useParams();
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    fetch(`/api/chapters?subjectId=${subjectId}`)
      .then(res => res.json())
      .then(setChapters);
  }, [subjectId]);

  return (
    <AppShell>
      <Header title="Chapters" description="Select a chapter" />

      <main className="p-6 space-y-3">
        {chapters.map(ch => (
          <Link
            key={ch.id}
            href={`/tutorials/${subjectId}/${ch.id}`}
            className="block border p-4 rounded hover:bg-muted"
          >
            {ch.title}
          </Link>
        ))}
      </main>
    </AppShell>
  );
}
