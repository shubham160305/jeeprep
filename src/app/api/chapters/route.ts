import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subjectId');

  const res = await pool.query(
    'SELECT * FROM chapters WHERE subject_id=$1 ORDER BY order_no',
    [subjectId]
  );

  return NextResponse.json(res.rows);
}
