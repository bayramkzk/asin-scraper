import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ApiContext from "@/types/ApiContext";
import deleteUsers from "@/utils/deleteUsers";
import getUsers from "@/utils/getUsers";
import patchUser from "@/utils/patchUser";
import postUser from "@/utils/postUser";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== "POST" &&
    req.method !== "GET" &&
    req.method !== "PATCH" &&
    req.method !== "DELETE"
  ) {
    return res.status(404).json({ error: "Undefined method" });
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(500).json({ error: "No session acquired" });
  }

  const context: ApiContext = { req, res, session };

  switch (req.method) {
    case "POST":
      return await postUser(context);
    case "GET":
      return await getUsers(context);
    case "PATCH":
      return await patchUser(context);
    case "DELETE":
      return await deleteUsers(context);
  }
}
