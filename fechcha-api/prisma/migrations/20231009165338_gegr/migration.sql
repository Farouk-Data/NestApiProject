/*
  Warnings:

  - The `rankBoard` column on the `players` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "players" DROP COLUMN "rankBoard",
ADD COLUMN     "rankBoard" "RankBoard" NOT NULL DEFAULT 'Provisional';
