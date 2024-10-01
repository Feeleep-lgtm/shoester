/*
  Warnings:

  - Added the required column `name` to the `Shoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictures` to the `Shoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Shoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units` to the `Shoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Shoes` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Shoes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Shoes" DROP CONSTRAINT "Shoes_userId_fkey";

-- AlterTable
ALTER TABLE "Shoes" ADD COLUMN     "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "pictures" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "units" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAT" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Purchases" (
    "id" TEXT NOT NULL,
    "shoesId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchases_id_key" ON "Purchases"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");

-- AddForeignKey
ALTER TABLE "Shoes" ADD CONSTRAINT "Shoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_shoesId_fkey" FOREIGN KEY ("shoesId") REFERENCES "Shoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
