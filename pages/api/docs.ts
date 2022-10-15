import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

type Queryparam = string | string[] | undefined;
type Domain = "htmlCom" | "htmlAe" | "htmlAeDollar";

const checkAsin = (asin: Queryparam) =>
  typeof asin === "string" && asin.length === 10;

const checkDomain = (domain: Queryparam) =>
  typeof domain === "string" &&
  (domain === "htmlCom" || domain === "htmlAe" || domain === "htmlAeDollar");

const validateQuery = (query: NextApiRequest["query"]) => {
  const { asin, domain } = query;
  if (checkAsin(asin) && checkDomain(domain)) {
    return { asin: asin as string, domain: domain as Domain };
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = validateQuery(req.query);
  if (req.method !== "GET" || !body) return res.status(400).end();

  const log = await prisma.productHtmlLog.findUnique({
    where: { asin: body.asin },
  });
  if (!log) return res.status(404).json({ error: "Not Found" });

  const doc = log[body.domain];
  res.send(doc);
}
