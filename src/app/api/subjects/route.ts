import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await pool.query(
    'SELECT * FROM subjects ORDER BY name'
  );
  return NextResponse.json(res.rows);
}
