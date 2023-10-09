/*
  Warnings:

  - The `division` column on the `players` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "players" DROP COLUMN "division",
ADD COLUMN     "division" "Division" NOT NULL DEFAULT 'Nooby';
