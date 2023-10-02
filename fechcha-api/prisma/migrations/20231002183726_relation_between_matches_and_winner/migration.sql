/*
  Warnings:

  - Added the required column `winnerId` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "winnerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "players"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;
