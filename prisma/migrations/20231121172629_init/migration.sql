-- CreateTable
CREATE TABLE "CommentInteractions" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "commentId" STRING NOT NULL,
    "type" "Interaction" NOT NULL,

    CONSTRAINT "CommentInteractions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommentInteractions_userId_commentId_key" ON "CommentInteractions"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "CommentInteractions" ADD CONSTRAINT "CommentInteractions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentInteractions" ADD CONSTRAINT "CommentInteractions_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "VideoComments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
