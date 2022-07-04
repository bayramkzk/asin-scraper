import useSWR from "swr";
import { Product } from "@prisma/client";

export default function useProducts() {
  const { data, error } = useSWR<Product[]>("/api/products");

  if (error) {
    console.error(error);
  }

  return {
    products: data,
    error,
    loading: !error && !data,
  };
}
