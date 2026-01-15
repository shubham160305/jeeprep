'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="p-6 max-w-sm mx-auto space-y-4">
      <h1 className="text-xl font-bold">Forgot Password</h1>

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button onClick={send} disabled={loading}>
        {loading ? 'Sending...' : 'Send reset link'}
      </Button>

      {sent && (
        <div className="text-sm text-muted-foreground">
          <p>If the email exists, a reset link was sent.</p>
          <button
            onClick={send}
            className="underline mt-2 text-primary"
          >
            Resend link
          </button>
        </div>
      )}
    </div>
  );
}
