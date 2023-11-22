-- CreateTable
CREATE TABLE "CommentReplies" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "commentId" STRING NOT NULL,
    "reply" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReplies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentReplies" ADD CONSTRAINT "CommentReplies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReplies" ADD CONSTRAINT "CommentReplies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "VideoComments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
