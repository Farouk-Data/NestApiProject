/*
  Warnings:

  - Added the required column `numOfGames` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "numOfGames" INTEGER NOT NULL,
ADD COLUMN     "rank" INTEGER NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "state" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Matches" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Matches_pkey" PRIMARY KEY ("id")
);
