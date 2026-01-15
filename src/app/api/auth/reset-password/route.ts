import { pool } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const res = await pool.query(
    `
    SELECT pr.user_id
    FROM password_resets pr
    WHERE pr.token=$1 AND pr.expires_at > now()
    `,
    [token]
  );

  if (res.rowCount === 0) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    'UPDATE users SET password_hash=$1 WHERE id=$2',
    [hash, res.rows[0].user_id]
  );

  await pool.query(
    'DELETE FROM password_resets WHERE token=$1',
    [token]
  );

  return NextResponse.json({ success: true });
}
