-- AlterTable
ALTER TABLE "users" ADD COLUMN     "expiration_date" TIMESTAMP(6) NOT NULL DEFAULT '9999-12-30 00:00:00 +00:00';
