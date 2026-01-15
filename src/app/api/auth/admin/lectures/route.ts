import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { pool } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, videoId, chapterId } = await req.json();

  await pool.query(
    `
    INSERT INTO lectures (title, video_id, chapter_id, order_no)
    VALUES ($1, $2, $3, 1)
    `,
    [title, videoId, chapterId]
  );

  return NextResponse.json({ success: true });
}
