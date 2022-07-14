import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ApiContext from "@/types/ApiContext";
import getProducts from "@/utils/getProducts";
import postProducts from "@/utils/postProducts";
import deleteProducts from "@/utils/deleteProducts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== "POST" &&
    req.method !== "GET" &&
    req.method !== "DELETE"
  ) {
    return res.status(404).json({ error: "Undefined method" });
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(500).json({ error: "No session acquired" });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const context: ApiContext = { req, res, session };

  switch (req.method) {
    case "POST":
      return await postProducts(context);
    case "GET":
      return await getProducts(context);
    case "DELETE":
      return await deleteProducts(context);
  }
}
