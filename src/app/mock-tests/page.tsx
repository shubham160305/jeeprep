'use client';

import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockTests } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function MockTestsPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;
  if (!session) redirect('/login');

  return (
    <AppShell>
      <div className="flex min-h-screen w-full flex-col">
        <Header
          title="Mock Tests"
          description="Put your skills to the test with our challenging exercises."
        />

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockTests.map((test) => (
              <Card key={test.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline">
                    {test.title}
                  </CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {test.questionCount} questions
                  </p>
                </CardContent>

                <CardFooter>
                  <Link href={`/mock-tests/${test.id}`}>
                    <Button>
                      Start Test
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </AppShell>
  );
}
