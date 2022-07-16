import { prisma } from "@/lib/prisma";
import ApiContext from "@/types/ApiContext";
import bcrypt from "bcrypt";

interface PostUserBody {
  name?: string;
  email?: string;
  password?: string;
}

export default async function postUser({ req, res }: ApiContext) {
  const body = req.body as PostUserBody;

  if (!body.name || !body.email || !body.password) {
    return res.status(400).json({ error: "Missing required body field" });
  }

  const result = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hash: await bcrypt.hash(body.password, 10),
    },
  });

  res.status(200).json(result);
}
