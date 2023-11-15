-- CreateTable
CREATE TABLE "VideoViews" (
    "id" STRING NOT NULL,
    "viewerId" STRING NOT NULL,
    "videoId" STRING NOT NULL,

    CONSTRAINT "VideoViews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoViews" ADD CONSTRAINT "VideoViews_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoViews" ADD CONSTRAINT "VideoViews_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
