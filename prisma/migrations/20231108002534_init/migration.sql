/*
  Warnings:

  - Added the required column `url` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "url" STRING NOT NULL;
