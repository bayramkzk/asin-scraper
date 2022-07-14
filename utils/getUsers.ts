import prisma from "@/lib/prisma";
import ApiContext from "@/types/ApiContext";
import getTargetMutationRole from "./getTargetMutationRole";

export default async function getUsers({ res, session }: ApiContext) {
  const targetRole = getTargetMutationRole(session);
  if (targetRole === null) {
    return res
      .status(401)
      .json({ error: "User not authorized for this request" });
  }

  const users = await prisma.user.findMany({
    where: { role: targetRole },
  });

  res.status(200).json(users);
}
