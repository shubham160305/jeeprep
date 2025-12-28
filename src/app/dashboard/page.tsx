'use client';

import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import StatsCards from '@/components/dashboard/stats-cards';
import ProgressChart from '@/components/dashboard/progress-chart';
import { user } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';


export default function DashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setIsLoggedIn(true);
    } else {
      redirect('/login');
    }
  }, []);

  if (isLoggedIn === null) {
    // Return a loading state or null while checking auth status
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Loading..." />
            <main className="flex-1 space-y-6 p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                </div>
                <Skeleton className="h-[400px]" />
            </main>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title={`Welcome back, ${user.name}!`} description="Here's a summary of your progress." />
      <main className="flex-1 space-y-6 p-6">
        <StatsCards />
        <ProgressChart />
      </main>
    </div>
  );
}
