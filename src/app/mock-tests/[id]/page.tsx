'use client';

import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/header';
import TestInterface from '@/components/mock-tests/test-interface';
import { mockTestQuestions, mockTests } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function MockTestPage({
  params,
}: {
  params: { id: string };
}) {
  const test = mockTests.find((t) => t.id === params.id);
  const questions = mockTestQuestions[params.id] ?? [];

  if (!test) {
    notFound();
  }

  return (
    <AppShell>
      <div className="flex min-h-screen w-full flex-col">
        <Header title={test.title} description={test.description} />

        <main className="flex-1 p-6">
          <TestInterface questions={questions} testId={params.id} />
        </main>
      </div>
    </AppShell>
  );
}
