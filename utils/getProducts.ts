import { prisma } from "@/lib/prisma";
import ApiContext from "@/types/ApiContext";

export default async function getProducts({ res, session }: ApiContext) {
  const products = await prisma.product.findMany({
    where: { authorId: session.user.id },
    select: {
      id: true,
      asin: true,
      aePrice: true,
      aedToDollar: true,
      rate: true,
      rating: true,
      comPrice: true,
      shippingCost: true,
      importFee: true,
      totalPrice: true,
      comRank: true,
      soldBy: true,
      createdAt: true,
    },
  });

  return res.status(200).json(products);
}
