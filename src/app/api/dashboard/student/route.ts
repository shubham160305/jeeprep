import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { pool } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  // 1️⃣ Chapters completed
  const chaptersCompletedRes = await pool.query(
    `
    SELECT COUNT(DISTINCT c.id)
    FROM chapters c
    JOIN lectures l ON l.chapter_id = c.id
    JOIN lecture_progress lp ON lp.lecture_id = l.id
    WHERE lp.user_id = $1 AND lp.completed = true
    `,
    [userId]
  );

  // 2️⃣ Tests taken
  const testsTakenRes = await pool.query(
    `
    SELECT COUNT(*) FROM test_attempts
    WHERE user_id = $1
    `,
    [userId]
  );

  // 3️⃣ Average score
  const avgScoreRes = await pool.query(
    `
    SELECT COALESCE(AVG(score), 0) as avg
    FROM test_attempts
    WHERE user_id = $1
    `,
    [userId]
  );

  // 4️⃣ Hours learned
  const hoursRes = await pool.query(
    `
    SELECT COALESCE(SUM(watched_percent) / 100 * 0.25, 0) as hours
    FROM lecture_progress
    WHERE user_id = $1
    `,
    [userId]
  );

  return NextResponse.json({
    chaptersCompleted: Number(chaptersCompletedRes.rows[0].count),
    testsTaken: Number(testsTakenRes.rows[0].count),
    averageScore: Math.round(Number(avgScoreRes.rows[0].avg)),
    hoursLearned: Math.round(Number(hoursRes.rows[0].hours)),
    chart: [
      { month: 'Jan', score: 65 },
      { month: 'Feb', score: 68 },
      { month: 'Mar', score: 72 },
      { month: 'Apr', score: 75 },
      { month: 'May', score: 80 },
      { month: 'Jun', score: 78 },
    ],
  });
}
