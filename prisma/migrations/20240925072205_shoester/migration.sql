/*
  Warnings:

  - The `address` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT,
DROP COLUMN "address",
ADD COLUMN     "address" TEXT[];
