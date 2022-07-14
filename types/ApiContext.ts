import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

export default interface ApiContext<T = any> {
  req: NextApiRequest;
  res: NextApiResponse<T>;
  session: Session;
}
