/*
  Warnings:

  - The `division` column on the `players` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rankBoard` column on the `players` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Division" AS ENUM ('Nooby', 'Bronze', 'Gold', 'Legend');

-- CreateEnum
CREATE TYPE "RankBoard" AS ENUM ('Provisional', 'Established');

-- AlterTable
ALTER TABLE "players" DROP COLUMN "division",
ADD COLUMN     "division" "Division" NOT NULL DEFAULT 'Nooby',
DROP COLUMN "rankBoard",
ADD COLUMN     "rankBoard" "RankBoard" NOT NULL DEFAULT 'Provisional';
