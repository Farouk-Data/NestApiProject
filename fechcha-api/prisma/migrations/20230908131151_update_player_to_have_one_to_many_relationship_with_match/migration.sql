/*
  Warnings:

  - You are about to drop the column `state` on the `players` table. All the data in the column will be lost.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "players" DROP COLUMN "state";

-- DropTable
DROP TABLE "Match";

-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "state" INTEGER NOT NULL,
    "playerId1" INTEGER NOT NULL,
    "playerId2" INTEGER NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_playerId1_fkey" FOREIGN KEY ("playerId1") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_playerId2_fkey" FOREIGN KEY ("playerId2") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
