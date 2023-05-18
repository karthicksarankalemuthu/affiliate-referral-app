-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" TEXT NOT NULL,
    "advocate_id" TEXT NOT NULL,
    "referral_email" TEXT NOT NULL,
    "discount_code" TEXT NOT NULL,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_referral_email_key" ON "referrals"("referral_email");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_discount_code_key" ON "referrals"("discount_code");
