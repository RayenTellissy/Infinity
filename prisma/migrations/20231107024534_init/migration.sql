-- CreateTable
CREATE TABLE "Videos" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "thumbnail" STRING NOT NULL,
    "duration" INT4 NOT NULL,
    "ownerId" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoLikes" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "videosId" STRING NOT NULL,

    CONSTRAINT "VideoLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoComments" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "videoId" STRING NOT NULL,
    "comment" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoLikes" ADD CONSTRAINT "VideoLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoLikes" ADD CONSTRAINT "VideoLikes_videosId_fkey" FOREIGN KEY ("videosId") REFERENCES "Videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoComments" ADD CONSTRAINT "VideoComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoComments" ADD CONSTRAINT "VideoComments_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
