'use client';

import ProgressChart from '@/components/dashboard/progress-chart';
import StatsCards from '@/components/dashboard/stats-cards';
import Header from '@/components/layout/header';
import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/dashboard/student')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        title="Student Dashboard"
        description="Your learning progress"
      />

      <main className="flex-1 p-6 space-y-6">
        <StatsCards data={data} />
        <ProgressChart chart={data.chart} />
      </main>
    </div>
  );
}
