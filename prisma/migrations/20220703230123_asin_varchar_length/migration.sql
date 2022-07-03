/*
  Warnings:

  - You are about to alter the column `asin` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "asin" SET DATA TYPE VARCHAR(10);
