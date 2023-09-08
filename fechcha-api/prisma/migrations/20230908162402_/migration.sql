/*
  Warnings:

  - The primary key for the `matches` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `playerId1` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `playerId2` on the `matches` table. All the data in the column will be lost.
  - The primary key for the `players` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `players` table. All the data in the column will be lost.
  - Added the required column `adversaryId` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_playerId1_fkey";

-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_playerId2_fkey";

-- AlterTable
ALTER TABLE "matches" DROP CONSTRAINT "matches_pkey",
DROP COLUMN "id",
DROP COLUMN "playerId1",
DROP COLUMN "playerId2",
ADD COLUMN     "adversaryId" INTEGER NOT NULL,
ADD COLUMN     "matchId" SERIAL NOT NULL,
ADD CONSTRAINT "matches_pkey" PRIMARY KEY ("matchId");

-- AlterTable
ALTER TABLE "players" DROP CONSTRAINT "players_pkey",
DROP COLUMN "id",
ADD COLUMN     "playerId" SERIAL NOT NULL,
ADD CONSTRAINT "players_pkey" PRIMARY KEY ("playerId");

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_adversaryId_fkey" FOREIGN KEY ("adversaryId") REFERENCES "players"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;
