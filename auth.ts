import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/logo.png",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Google,
    Github,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials) => {
        if (!credentials) {
          return null;
        }

        const user = { id: 1, name: 'John Smith', email: 'test@example.com' };

        if (
          credentials.email === 'test@example.com' &&
          credentials.password === 'password'
        ) {
          return user;
        } else {
          return null;
        }
      }
    }),
  ],
  trustHost: true,
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
});

function saltAndHashPassword(password: string) {
  return password;
}
