'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const token = useSearchParams().get('token');
  const router = useRouter();
  const [password, setPassword] = useState('');

  const submit = async () => {
    await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    router.push('/login');
  };

  return (
    <div className="p-6 max-w-sm mx-auto space-y-4">
      <h1 className="text-xl font-bold">Reset Password</h1>
      <Input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={submit}>Reset</Button>
    </div>
  );
}
