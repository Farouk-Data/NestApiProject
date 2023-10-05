/*
  Warnings:

  - You are about to drop the column `type` on the `matches` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "type";

-- DropEnum
DROP TYPE "matchType";
