/*
  Warnings:

  - A unique constraint covering the columns `[subscriberId,subscribedId]` on the table `Subscribers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_subscriberId_subscribedId_key" ON "Subscribers"("subscriberId", "subscribedId");
