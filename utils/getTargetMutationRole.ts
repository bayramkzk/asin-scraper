import { Prisma, Role } from "@prisma/client";
import { Session } from "next-auth";

function getTargetMutationRole(
  session: Session
): Role | Prisma.EnumRoleFilter | null {
  if (session.user.role === "SUPERADMIN") return { in: ["ADMIN", "USER"] };
  if (session.user.role === "ADMIN") return "USER";
  return null;
}

export default getTargetMutationRole;
