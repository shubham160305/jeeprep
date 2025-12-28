'use client'
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

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
    return null;
  }

  // The rest of your component...
  // You can return a loading spinner here while the redirect is happening
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
