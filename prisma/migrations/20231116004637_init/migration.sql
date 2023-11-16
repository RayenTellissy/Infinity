/*
  Warnings:

  - You are about to drop the column `videosId` on the `VideoLikes` table. All the data in the column will be lost.
  - Added the required column `videoId` to the `VideoLikes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VideoLikes" DROP CONSTRAINT "VideoLikes_videosId_fkey";

-- AlterTable
ALTER TABLE "VideoLikes" DROP COLUMN "videosId";
ALTER TABLE "VideoLikes" ADD COLUMN     "videoId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "VideoLikes" ADD CONSTRAINT "VideoLikes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
