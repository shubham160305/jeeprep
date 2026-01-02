import { pool } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const passwordHash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
    [email, passwordHash]
  );

  return NextResponse.json({ success: true });
}
