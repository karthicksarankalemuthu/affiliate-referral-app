-- CreateTable
CREATE TABLE "affiliate" (
    "id" TEXT NOT NULL,
    "campaign_name" TEXT NOT NULL,
    "campaign_type" TEXT NOT NULL,
    "promoted_product" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "Time" TEXT NOT NULL,
    "offer_name" TEXT NOT NULL,
    "commission_type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "customer_discount" TEXT NOT NULL,
    "influencer_name" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "affiliate_pkey" PRIMARY KEY ("id")
);
