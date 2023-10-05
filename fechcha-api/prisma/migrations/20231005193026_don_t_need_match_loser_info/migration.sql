/*
  Warnings:

  - You are about to drop the column `loserId` on the `matches` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_loserId_fkey";

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "loserId";
