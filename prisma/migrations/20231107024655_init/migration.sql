/*
  Warnings:

  - Added the required column `visibility` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('public', 'private');

-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "visibility" "Visibility" NOT NULL;
