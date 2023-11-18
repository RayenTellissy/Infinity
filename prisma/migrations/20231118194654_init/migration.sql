/*
  Warnings:

  - A unique constraint covering the columns `[userId,videoId]` on the table `VideoInteractions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[viewerId,videoId]` on the table `VideoViews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VideoInteractions_userId_videoId_key" ON "VideoInteractions"("userId", "videoId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoViews_viewerId_videoId_key" ON "VideoViews"("viewerId", "videoId");
