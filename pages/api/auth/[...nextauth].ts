import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { SessionUser } from "@/types/User";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email", placeholder: "js@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore: Unresolved next-auth typing bug
      async authorize(credentials, req): Promise<SessionUser | null> {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { name: credentials.name },
        });

        if (!user) return null;

        const success = await bcrypt.compare(credentials.password, user.hash);

        if (success) {
          return {
            name: user.name,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      console.log("In session", session, user, token);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("In jwt", token, user, account, profile);
      token.user = user;
      return token;
    },
  },
});
