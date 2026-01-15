'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    setLoading(true);

    await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    setLoading(false);
    alert('Password updated');
  };

  if (!token) {
    return <div className="p-6 text-red-500">Invalid reset link</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Reset Password</h1>

      <input
        type="password"
        className="border p-2 w-full"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={resetPassword}
        disabled={loading}
        className="bg-primary text-white px-4 py-2 w-full"
      >
        {loading ? 'Saving...' : 'Reset Password'}
      </button>
    </div>
  );
}
