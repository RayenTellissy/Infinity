-- CreateTable
CREATE TABLE "Subscribers" (
    "id" STRING NOT NULL,
    "subscriberId" STRING NOT NULL,
    "subscribedId" STRING NOT NULL,

    CONSTRAINT "Subscribers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscribers" ADD CONSTRAINT "Subscribers_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscribers" ADD CONSTRAINT "Subscribers_subscribedId_fkey" FOREIGN KEY ("subscribedId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
