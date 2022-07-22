import { prisma } from "@/lib/prisma";
import ApiContext from "@/types/ApiContext";
import bcrypt from "bcrypt";
import checkRolePermission from "./checkRolePermission";

export interface PostUserBody {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export default async function postUser({ req, res, session }: ApiContext) {
  const body = req.body as PostUserBody;

  if (!body.name || !body.email || !body.password) {
    return res.status(400).json({ error: "Missing required body field" });
  }

  if (
    body.role !== "SUPERADMIN" &&
    body.role !== "ADMIN" &&
    body.role !== "USER"
  ) {
    return res.status(400).json({ error: "Invalid role" });
  }

  if (!checkRolePermission(session.user.role, body.role)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const result = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hash: await bcrypt.hash(body.password, 10),
      role: body.role,
    },
  });

  res.status(200).json(result);
}
