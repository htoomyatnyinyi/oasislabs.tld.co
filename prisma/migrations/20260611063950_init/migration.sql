-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED');

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'DRAFT';
