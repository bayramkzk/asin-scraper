import { prisma } from "@/lib/prisma";
import ProductContext from "@/types/ProductContext";
import parseProductHtml from "./parseProduct";

const parseAndLogProductHtml = async (ctx: ProductContext) => {
  const product = await parseProductHtml(ctx);

  await prisma.productHtmlLog.upsert({
    where: { asin: ctx.asin },
    create: ctx,
    update: ctx,
  });

  return product;
};

export default parseAndLogProductHtml;
