import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    // 🔐 GOOGLE OAUTH
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔑 EMAIL + PASSWORD
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await pool.query(
          "SELECT * FROM users WHERE email=$1",
          [credentials!.email]
        );

        const user = res.rows[0];
        if (!user || !user.password_hash) return null;

        const valid = await bcrypt.compare(
          credentials!.password,
          user.password_hash
        );

        if (!valid) return null;

        return user;
      },
    }),
  ],

  callbacks: {
    // ✅ SAVE GOOGLE USERS TO DB
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const exists = await pool.query(
          "SELECT id FROM users WHERE email=$1",
          [user.email]
        );

        if (exists.rowCount === 0) {
          await pool.query(
            `INSERT INTO users (name, email, provider)
             VALUES ($1, $2, 'google')`,
            [user.name, user.email]
          );
        }
      }
      return true;
    },

    // ✅ ADD ROLE TO JWT
    async jwt({ token }) {
      if (token.email) {
        const res = await pool.query(
          "SELECT role FROM users WHERE email=$1",
          [token.email]
        );
        token.role = res.rows[0]?.role || "user";
      }
      return token;
    },

    // ✅ EXPOSE ROLE TO UI
    async session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
  },

  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
