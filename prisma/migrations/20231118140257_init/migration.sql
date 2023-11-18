/*
  Warnings:

  - You are about to drop the `VideoDislikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoLikes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[viewerId,videoId]` on the table `VideoViews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Interaction" AS ENUM ('like', 'dislike');

-- DropForeignKey
ALTER TABLE "VideoDislikes" DROP CONSTRAINT "VideoDislikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoDislikes" DROP CONSTRAINT "VideoDislikes_videoId_fkey";

-- DropForeignKey
ALTER TABLE "VideoLikes" DROP CONSTRAINT "VideoLikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoLikes" DROP CONSTRAINT "VideoLikes_videoId_fkey";

-- DropTable
DROP TABLE "VideoDislikes";

-- DropTable
DROP TABLE "VideoLikes";

-- CreateTable
CREATE TABLE "VideoInteractions" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "videoId" STRING NOT NULL,
    "type" "Interaction" NOT NULL,

    CONSTRAINT "VideoInteractions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoInteractions_userId_videoId_key" ON "VideoInteractions"("userId", "videoId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoViews_viewerId_videoId_key" ON "VideoViews"("viewerId", "videoId");

-- AddForeignKey
ALTER TABLE "VideoInteractions" ADD CONSTRAINT "VideoInteractions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoInteractions" ADD CONSTRAINT "VideoInteractions_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
