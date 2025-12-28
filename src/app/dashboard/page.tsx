'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Header from '@/components/layout/header';
import StatsCards from '@/components/dashboard/stats-cards';
import ProgressChart from '@/components/dashboard/progress-chart';
import { user } from '@/lib/data';

// For now, we'll use a mock logged-in state.
// We can replace this with real auth state later.
const isLoggedIn = false;

export default function DashboardPage() {
  useEffect(() => {
    if (!isLoggedIn) {
      redirect('/login');
    }
  }, []);

  if (!isLoggedIn) {
    // Return a loading state or null while redirecting
    return null;
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
