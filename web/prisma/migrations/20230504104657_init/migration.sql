/*
  Warnings:

  - A unique constraint covering the columns `[customer_id]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_id` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "customer_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_id_key" ON "customers"("customer_id");
