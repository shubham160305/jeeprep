import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chapterId = searchParams.get('chapterId');

  if (!chapterId) {
    return NextResponse.json([]);
  }

  const res = await pool.query(
    `
    SELECT id, title, order_no
    FROM lectures
    WHERE chapter_id = $1
    ORDER BY order_no
    `,
    [chapterId]
  );

  return NextResponse.json(res.rows);
}
