/*
  Warnings:

  - You are about to drop the column `isFeatured` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `repoUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Project` table. All the data in the column will be lost.
  - Added the required column `excerpt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readTime` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('COMPLETED', 'IN_PROGRESS', 'PLANNED');

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- DropIndex
DROP INDEX "public"."Project_slug_key";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "isFeatured",
DROP COLUMN "thumbnail",
ADD COLUMN     "excerpt" TEXT NOT NULL,
ADD COLUMN     "featuredImage" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "readTime" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "features",
DROP COLUMN "ownerId",
DROP COLUMN "repoUrl",
DROP COLUMN "slug",
DROP COLUMN "thumbnail",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "public"."ProjectStatus" NOT NULL DEFAULT 'PLANNED',
ADD COLUMN     "technologies" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
