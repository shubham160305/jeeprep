import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { pool } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // 🔒 Admin protection
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { name } = await req.json();

  if (!name) {
    return NextResponse.json(
      { error: 'Subject name required' },
      { status: 400 }
    );
  }

  const res = await pool.query(
    `INSERT INTO subjects (name)
     VALUES ($1)
     RETURNING *`,
    [name]
  );

  return NextResponse.json(res.rows[0]);
}
