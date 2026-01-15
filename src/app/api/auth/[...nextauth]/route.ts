import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
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
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const res = await pool.query(
          "SELECT * FROM users WHERE email=$1",
          [credentials.email]
        );

        const user = res.rows[0];
        if (!user || !user.password_hash) return null;

        const valid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );

        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
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
            `
            INSERT INTO users (name, email, provider, role)
            VALUES ($1, $2, 'google', 'user')
            `,
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
          "SELECT role, id FROM users WHERE email=$1",
          [token.email]
        );

        token.role = res.rows[0]?.role || "user";
        token.id = res.rows[0]?.id;
      }
      return token;
    },

    // ✅ EXPOSE ROLE + ID TO CLIENT
    async session({ session, token }) {
      session.user.role = token.role as string;
      session.user.id = token.id as string;
      return session;
    },
  },

  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
