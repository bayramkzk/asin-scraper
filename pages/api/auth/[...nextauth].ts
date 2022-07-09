import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { SessionUser } from "@/types/User";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "me@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore: Unresolved next-auth typing bug
      async authorize(credentials, req): Promise<SessionUser | null> {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
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
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      token.user = user;
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export { authOptions };

export default NextAuth(authOptions);
