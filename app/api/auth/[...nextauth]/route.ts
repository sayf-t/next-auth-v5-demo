import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you would typically check against your database
        // For testing, we'll use hardcoded credentials
        const testUsers = [
          { id: "1", email: "user1@example.com", password: "password123" },
          { id: "2", email: "user2@example.com", password: "password456" },
        ];

        const user = testUsers.find(user => user.email === credentials?.email);

        if (user && user.password === credentials?.password) {
          return { id: user.id, email: user.email };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };