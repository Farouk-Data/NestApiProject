/*
  Warnings:

  - Changed the type of `division` on the `players` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rankBoard` on the `players` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "players" DROP COLUMN "division",
ADD COLUMN     "division" TEXT NOT NULL,
DROP COLUMN "rankBoard",
ADD COLUMN     "rankBoard" TEXT NOT NULL;
