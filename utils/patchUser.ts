import { prisma } from "@/lib/prisma";
import ApiContext from "@/types/ApiContext";
import { Prisma } from "@prisma/client";
import { Session } from "next-auth";

type PatchUserData =
  | (Prisma.Without<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput> &
      Prisma.UserUncheckedUpdateInput)
  | (Prisma.Without<Prisma.UserUncheckedUpdateInput, Prisma.UserUpdateInput> &
      Prisma.UserUpdateInput);

interface PatchUserBody {
  id?: number;
  data?: PatchUserData;
}

/**
 * ```
 *                                       session.role
 *                          superadmin | admin        | user |
 *           | superadmin | -          | -            | -    |
 * body.role | admin      | +          | -            | -    |
 *           | user       | +          | +            | -    |
 * ```
 */
function checkUserPatchPermission(data: PatchUserData, session: Session) {
  return (
    data.role !== "SUPERADMIN" &&
    session.user.role !== "USER" &&
    (session.user.role !== "ADMIN" || data.role !== "ADMIN")
  );
}

export default async function patchUser({ req, res, session }: ApiContext) {
  const body = req.body as PatchUserBody;
  if (body.id === undefined || body.data === undefined) {
    return res.status(400).json({ error: "Missing required body field" });
  }

  if (!checkUserPatchPermission(body.data, session)) {
    return res
      .status(401)
      .json({ error: "User not authorized for this request" });
  }

  const result = await prisma.user.update({
    where: { id: body.id },
    data: body.data,
  });

  return result;
}
