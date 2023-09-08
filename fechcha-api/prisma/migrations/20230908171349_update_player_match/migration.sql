/*
  Warnings:

  - Added the required column `homeId` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "homeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "players"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;
