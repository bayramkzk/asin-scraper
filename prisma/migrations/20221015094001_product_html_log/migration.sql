-- CreateTable
CREATE TABLE "product_html_log" (
    "asin" VARCHAR(10) NOT NULL,
    "html_com" TEXT NOT NULL,
    "html_ae" TEXT NOT NULL,
    "html_ae_dollar" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_html_log_pkey" PRIMARY KEY ("asin")
);
