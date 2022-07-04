import prisma from "@/lib/prisma";
import ProductData from "@/types/Product";
import ApiContext from "@/types/ApiContext";
import ProductContext from "@/types/ProductContext";
import parseProductHtml from "./parseProduct";

export interface PostProductsResult {
  data: PromiseSettledResult<ProductData>[];
  createdCount: number;
}

export async function fetchProductContext(
  asin: string
): Promise<ProductContext> {
  const headers = { "User-Agent": process.env.USER_AGENT as string };

  const [htmlCom, htmlAe, htmlAeDollar] = await Promise.all([
    fetch(`https://www.amazon.com/dp/${asin}`, {
      headers: { Cookie: process.env.AMAZON_COM_COOKIE as string, ...headers },
    }).then((res) => res.text()),
    fetch(`https://www.amazon.ae/dp/${asin}?language=en_AE&currency=AED`, {
      headers,
    }).then((res) => res.text()),
    fetch(`https://www.amazon.ae/dp/${asin}?language=en_AE&currency=USD`, {
      headers: {
        Cookie: process.env.AMAZON_AE_DOLLAR_COOKIE as string,
        ...headers,
      },
    }).then((res) => res.text()),
  ]);

  return { asin, htmlCom, htmlAe, htmlAeDollar };
}

export default async function postProducts({ req, res, user }: ApiContext) {
  if (!req.body.asinCodes) {
    return res.status(400).json({ error: "Missing required body field" });
  }

  const asinCodes = req.body.asinCodes as string[];

  const settledProducts = await Promise.allSettled(
    asinCodes.map((asin) => fetchProductContext(asin).then(parseProductHtml))
  );

  const fulfilledProducts = settledProducts
    .filter((r) => r.status === "fulfilled")
    .map((r) => r as PromiseFulfilledResult<ProductData>)
    .map((r) => r.value);

  const { count: createdCount } = await prisma.product.createMany({
    data: fulfilledProducts.map((p) => ({ ...p, authorId: user.id })),
    skipDuplicates: true,
  });

  res.status(200).json({ data: settledProducts, createdCount });
}
