'use client';

import Header from '@/components/layout/header';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        title="Admin Dashboard"
        description="Manage courses, live classes, and students"
      />

      <main className="flex-1 p-6 space-y-4">
        <div>📹 Upload Recorded Videos</div>
        <div>🔴 Start Live Classes</div>
        <div>👨‍🎓 Manage Students</div>
        <div>📊 View Analytics</div>
      </main>
    </div>
  );
}
