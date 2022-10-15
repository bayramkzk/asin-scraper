import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { asin, domain } = req.query;
  if (!asin || !domain || Array.isArray(asin) || Array.isArray(domain)) {
    return res.status(400).json({ error: "Bad Request" });
  }
  try {
    const html = await fs.readFile(`./html/${asin}-${domain}.html`, "utf-8");
    res.status(200).send(html);
  } catch (e) {
    return res.status(404).json({ error: "Not Found" });
  }
}
