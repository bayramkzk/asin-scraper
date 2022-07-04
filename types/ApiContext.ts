import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

export default interface ApiContext<T = any> {
  req: NextApiRequest;
  res: NextApiResponse<T>;
  user: User;
  session: Session;
}
