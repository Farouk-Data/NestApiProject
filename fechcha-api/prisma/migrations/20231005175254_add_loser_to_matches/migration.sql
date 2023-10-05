-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "loserId" INTEGER;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_loserId_fkey" FOREIGN KEY ("loserId") REFERENCES "players"("playerId") ON DELETE SET NULL ON UPDATE CASCADE;
