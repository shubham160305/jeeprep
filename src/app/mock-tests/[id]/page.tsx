import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import { mockTests, mockTestQuestions } from '@/lib/data';
import TestInterface from '@/components/mock-tests/test-interface';

export default function MockTestPage({ params }: { params: { id: string } }) {
  const test = mockTests.find((t) => t.id === params.id);
  const questions = mockTestQuestions[params.id];

  if (!test || !questions) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title={test.title} description={test.description} />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <TestInterface questions={questions} />
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
    return mockTests.map((test) => ({
      id: test.id,
    }));
}
