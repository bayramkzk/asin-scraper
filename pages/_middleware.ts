import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // @ts-ignore: Next-auth typing problems
  function middleware(req: NextRequest & { nextauth: { token: JWT | null } }) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const authorized =
          !!token?.email || req.nextUrl.pathname === "/auth/signin";
        return authorized;
      },
    },
  }
);
