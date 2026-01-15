'use client';

import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

type Subject = {
  id: string;
  name: string;
  description?: string;
  duration?: string;
};

export default function TutorialsPage() {
  const { data: session, status } = useSession();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    fetch('/api/subjects')
      .then(res => res.json())
      .then(setSubjects);
  }, []);

  if (status === 'loading') return null;
  if (!session) redirect('/login');

  return (
    <AppShell>
      <Header
        title="JEE Subjects"
        description="Choose a subject to start learning chapter by chapter."
      />

      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {subjects.map(subject => (
          <Link key={subject.id} href={`/tutorials/${subject.id}`}>
            <Card className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{subject.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {subject.description || 'Complete syllabus'}
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  {subject.duration || 'Full Course'}
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </main>
    </AppShell>
  );
}
