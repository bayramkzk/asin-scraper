import { prisma } from "@/lib/prisma";
import ApiContext from "@/types/ApiContext";

export default async function deleteProducts({
  req,
  res,
  session,
}: ApiContext) {
  if (!req.body.idList) {
    return res.status(400).json({ error: "Missing required body field" });
  }

  const idList = req.body.idList as number[];

  const result = await prisma.product.deleteMany({
    where: { id: { in: idList }, authorId: session.user.id },
  });

  res.status(200).json(result);
}
