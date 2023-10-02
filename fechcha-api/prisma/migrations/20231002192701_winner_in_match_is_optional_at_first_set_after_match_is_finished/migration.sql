-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_winnerId_fkey";

-- AlterTable
ALTER TABLE "matches" ALTER COLUMN "winnerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "players"("playerId") ON DELETE SET NULL ON UPDATE CASCADE;
