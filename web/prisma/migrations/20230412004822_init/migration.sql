/*
  Warnings:

  - You are about to drop the `infliencer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "infliencer";

-- CreateTable
CREATE TABLE "influencer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "influencer_pkey" PRIMARY KEY ("id")
);
