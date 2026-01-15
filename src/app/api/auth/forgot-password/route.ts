import { pool } from '@/lib/db';
import { sendResetEmail } from '@/lib/mailer';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  const userRes = await pool.query(
    'SELECT id FROM users WHERE email=$1',
    [email]
  );

  // Always return success (security)
  if (userRes.rowCount === 0) {
    return NextResponse.json({ ok: true });
  }

  const userId = userRes.rows[0].id;
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 min

  // Delete old tokens (important)
  await pool.query(
    'DELETE FROM password_resets WHERE user_id=$1',
    [userId]
  );

  await pool.query(
    `
    INSERT INTO password_resets (user_id, token, expires_at)
    VALUES ($1, $2, $3)
    `,
    [userId, token, expires]
  );

  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await sendResetEmail(email, resetLink);

  return NextResponse.json({ ok: true });
}
