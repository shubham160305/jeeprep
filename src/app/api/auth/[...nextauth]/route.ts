import { pool } from "@/lib/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const res = await pool.query(
          "SELECT * FROM users WHERE email=$1",
          [credentials?.email]
        );

        const user = res.rows[0];
        if (!user || !user.password_hash) return null;

        const valid = await bcrypt.compare(
          credentials!.password,
          user.password_hash
        );

        if (!valid) return null;

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
