/*
  Warnings:

  - Changed the type of `size` on the `Shoes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `createdAT` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shoes" DROP COLUMN "size",
ADD COLUMN     "size" INTEGER NOT NULL,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAT" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
