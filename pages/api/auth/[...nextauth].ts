import NextAuth, { NextAuthOptions, Session } from "next-auth";
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
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }): Promise<Session> {
      session.user = token.user as SessionUser;
      return session;
    },
    async jwt({ token, user }) {
      token.user ??= user;
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export { authOptions };

export default NextAuth(authOptions);
