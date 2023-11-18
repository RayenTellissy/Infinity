-- CreateTable
CREATE TABLE "VideoDislikes" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "videoId" STRING NOT NULL,

    CONSTRAINT "VideoDislikes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoDislikes" ADD CONSTRAINT "VideoDislikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoDislikes" ADD CONSTRAINT "VideoDislikes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
