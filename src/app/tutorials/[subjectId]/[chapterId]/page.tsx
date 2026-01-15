'use client';

import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/header';
import { Lock } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Lecture = {
  id: string;
  title: string;
  order_no: number;
};

type Progress = {
  lecture_id: string;
  completed: boolean;
};

export default function LecturesPage() {
  const { subjectId, chapterId } = useParams<{
    subjectId: string;
    chapterId: string;
  }>();

  const router = useRouter();

  // ✅ ALWAYS arrays
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chapterId) return;

    setLoading(true);

    Promise.all([
      fetch(`/api/lectures?chapterId=${chapterId}`)
        .then(res => res.ok ? res.json() : [])
        .catch(() => []),

      fetch(`/api/progress?chapterId=${chapterId}`)
        .then(res => res.ok ? res.json() : [])
        .catch(() => [])
    ]).then(([lecturesData, progressData]) => {
      setLectures(Array.isArray(lecturesData) ? lecturesData : []);
      setProgress(Array.isArray(progressData) ? progressData : []);
      setLoading(false);
    });

  }, [chapterId]);

  // 🔓 LOCK LOGIC
  const isUnlocked = (index: number) => {
    if (index === 0) return true;

    const prevLecture = lectures[index - 1];
    return progress.some(
      p => p.lecture_id === prevLecture.id && p.completed
    );
  };

  if (loading) {
    return (
      <AppShell>
        <div className="p-6">Loading lectures...</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Header title="Lectures" description="Complete lectures in order to unlock next" />

      <main className="p-6 space-y-3">
        {lectures.length === 0 && (
          <p className="text-muted-foreground">No lectures found.</p>
        )}

        {lectures.map((lec, index) => {
          const unlocked = isUnlocked(index);
          const completed = progress.some(
            p => p.lecture_id === lec.id && p.completed
          );

          return (
            <div
              key={lec.id}
              onClick={() => {
                if (unlocked) {
                  router.push(
                    `/tutorials/${subjectId}/${chapterId}/${lec.id}`
                  );
                }
              }}
              className={`flex items-center justify-between p-4 border rounded cursor-pointer transition
                ${unlocked ? 'hover:bg-muted' : 'opacity-50 cursor-not-allowed'}
              `}
            >
              <span>{lec.title}</span>

              {completed ? (
                <span className="text-green-600 font-bold">✓</span>
              ) : !unlocked ? (
                <Lock className="w-4 h-4 text-muted-foreground" />
              ) : null}
            </div>
          );
        })}
      </main>
    </AppShell>
  );
}
