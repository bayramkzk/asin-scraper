import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
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

  const products = await prisma.product.findMany({
    where: { authorId: user.id },
  });

  return res.status(200).json(products);
}
