import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { pool } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json(null);

  const { searchParams } = new URL(req.url);
  const lectureId = searchParams.get('lectureId');
  const chapterId = searchParams.get('chapterId');

  if (lectureId) {
    const r = await pool.query(
      'SELECT * FROM lecture_progress WHERE user_id=$1 AND lecture_id=$2',
      [session.user.id, lectureId]
    );
    return NextResponse.json(r.rows[0] || null);
  }

  const r = await pool.query(
    `
    SELECT lp.*
    FROM lecture_progress lp
    JOIN lectures l ON lp.lecture_id=l.id
    WHERE lp.user_id=$1 AND l.chapter_id=$2
    `,
    [session.user.id, chapterId]
  );

  return NextResponse.json(r.rows);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({});

  const { lectureId, watchedPercent, completed } = await req.json();

  await pool.query(
    `
    INSERT INTO lecture_progress (user_id, lecture_id, watched_percent, completed)
    VALUES ($1,$2,$3,$4)
    ON CONFLICT (user_id, lecture_id)
    DO UPDATE SET watched_percent=$3, completed=$4
    `,
    [session.user.id, lectureId, watchedPercent, completed]
  );

  return NextResponse.json({ success: true });
}
