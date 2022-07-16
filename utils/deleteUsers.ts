import ApiContext from "@/types/ApiContext";
import { prisma } from "@/lib/prisma";
import getTargetMutationRole from "./getTargetMutationRole";

export default async function deleteUsers({ req, res, session }: ApiContext) {
  const idList = req.body.idList as number[] | undefined;
  if (idList === undefined) {
    return res.status(400).json({ error: "Missing required body field" });
  }

  const targetRole = getTargetMutationRole(session);
  if (targetRole === null) {
    return res
      .status(401)
      .json({ error: "User not authorized for this request" });
  }

  const result = await prisma.user.deleteMany({
    where: { id: { in: idList }, role: targetRole },
  });

  res.status(200).json(result);
}
