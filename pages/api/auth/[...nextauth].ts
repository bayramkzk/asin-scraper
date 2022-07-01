import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { PublicUser } from "@/types/User";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore: Unresolved next-auth typing bug
      async authorize(credentials, req): Promise<PublicUser | null> {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) return null;

        const success = await bcrypt.compare(credentials.password, user.hash);

        if (success) {
          return {
            id: user.id,
            username: user.username,
          };
        }

        return null;
      },
    }),
  ],
});
