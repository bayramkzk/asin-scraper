export type ProductInsertionStatus =
  | "pending"
  | "loading"
  | "success"
  | "error";

type ProductAsin = string;

export type ProductInsertionStatusMap = {
  [asin: ProductAsin]: ProductInsertionStatus;
};
