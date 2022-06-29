import { JSDOM } from "jsdom";
import type { NextApiRequest, NextApiResponse } from "next";

interface ProductData {
  price: number;
}

export async function fetchProduct(asin: string): Promise<string> {
  const res = await fetch(
    `https://www.amazon.com/dp/${asin}?language=en_AE&currency=USD`,
    { headers: { Cookie: process.env.AMAZON_COOKIE as string } }
  );
  return res.text();
}

export function parseProductPrice(dom: JSDOM): number {
  const priceText = dom.window.document.querySelector(
    ".a-price.a-text-price.a-size-medium.apexPriceToPay span"
  )?.textContent;
  if (!priceText) throw "Couldn't find price span element";
  const priceNumber = Number(priceText?.slice(1));
  return priceNumber;
}

export function parseProductHTML(html: string): ProductData {
  const dom = new JSDOM(html);
  const price = parseProductPrice(dom);
  return { price };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData>
) {
  const asin = req.query.asin as string;
  if (req.method !== "GET") return res.status(404);
  const html = await fetchProduct(asin);
  const product = parseProductHTML(html);
  res.status(200).json(product);
}
