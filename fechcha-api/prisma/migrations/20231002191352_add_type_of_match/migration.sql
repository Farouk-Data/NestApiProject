-- CreateEnum
CREATE TYPE "matchType" AS ENUM ('NotSet', 'MatchMaking', 'Invite');

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "type" "matchType" NOT NULL DEFAULT 'NotSet';
