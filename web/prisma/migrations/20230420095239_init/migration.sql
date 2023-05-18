-- CreateTable
CREATE TABLE "pricerule" (
    "id" TEXT NOT NULL,
    "pricerule_name" TEXT NOT NULL,
    "discount_code" TEXT NOT NULL,
    "discount_type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,

    CONSTRAINT "pricerule_pkey" PRIMARY KEY ("id")
);
