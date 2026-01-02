'use client';

import ProgressChart from '@/components/dashboard/progress-chart';
import StatsCards from '@/components/dashboard/stats-cards';
import Header from '@/components/layout/header';
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // 🔄 Loading state
  if (status === "loading") {
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

  // 🔐 Extra safety
  if (!session) return null;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header
        title={`Welcome back, ${session.user?.email}!`}
        description="Here's a summary of your progress."
      />

      <main className="flex-1 space-y-6 p-6">
        <StatsCards />
        <ProgressChart />

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </Button>
      </main>
    </div>
  );
}
