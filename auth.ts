import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { getUserById } from "@/data/user";
import { Adapter } from "next-auth/adapters";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      //Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (user?.id) {
        const existingUser = await getUserById(user?.id);

        // Prevent sign in without email verification
        if (!existingUser?.emailVerified) {
          return false;
        }
      }
      // TODO: Add 2FA check here

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
