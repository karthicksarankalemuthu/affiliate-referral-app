/*
  Warnings:

  - Added the required column `get_discount` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" ADD COLUMN     "get_discount" BOOLEAN NOT NULL;
