/*
  Warnings:

  - A unique constraint covering the columns `[userId,videoId]` on the table `VideoDislikes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,videoId]` on the table `VideoLikes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VideoDislikes_userId_videoId_key" ON "VideoDislikes"("userId", "videoId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoLikes_userId_videoId_key" ON "VideoLikes"("userId", "videoId");
