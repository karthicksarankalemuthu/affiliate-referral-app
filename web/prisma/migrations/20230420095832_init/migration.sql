/*
  Warnings:

  - Added the required column `activate` to the `pricerule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pricerule" ADD COLUMN     "activate" BOOLEAN NOT NULL;
