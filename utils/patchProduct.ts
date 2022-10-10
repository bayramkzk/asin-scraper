import { prisma } from "@/lib/prisma";
import ApiContext from "@/types/ApiContext";
import { Product } from "@prisma/client";

interface PatchProductBody {
  id?: number;
  data?: Partial<Omit<Product, "id" | "authorId" | "createdAt">>;
}

export default async function patchProduct({ req, res, session }: ApiContext) {
  const body = req.body as PatchProductBody;
  if (body.id === undefined || !body.data) {
    return res.status(400).json({ error: "Missing required body field" });
  }
  const id = body.id as number;

  const product = await prisma.product.findUnique({
    where: { id },
    select: { authorId: true },
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  if (product.authorId !== session.user.id) {
    return res
      .status(401)
      .json({ error: "User not authorized for this request" });
  }

  const result = await prisma.product.update({
    where: { id },
    data: {
      ...body.data,
      authorId: undefined,
      id: undefined,
      createdAt: undefined,
    },
  });

  res.status(200).json(result);
}
