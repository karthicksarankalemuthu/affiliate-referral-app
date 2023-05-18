-- CreateTable
CREATE TABLE "advocate" (
    "id" TEXT NOT NULL,
    "advocate_name" TEXT NOT NULL,
    "discount_code" TEXT NOT NULL,
    "discount_type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "activate" BOOLEAN NOT NULL,

    CONSTRAINT "advocate_pkey" PRIMARY KEY ("id")
);
