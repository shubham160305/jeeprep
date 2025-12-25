import Header from '@/components/layout/header';
import StatsCards from '@/components/dashboard/stats-cards';
import ProgressChart from '@/components/dashboard/progress-chart';
import { user } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title={`Welcome back, ${user.name.split(' ')[0]}!`} description="Here's a summary of your learning journey." />
      <main className="flex-1 space-y-8 p-6">
        <StatsCards />
        <ProgressChart />
      </main>
    </div>
  );
}
