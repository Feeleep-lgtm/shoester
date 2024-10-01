/*
  Warnings:

  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('ADIDAS', 'NIKE', 'SUPREME', 'BAALENCIAGA', 'SKETCHERS', 'PUMA');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('COPERATE', 'SNEAKERS', 'SLIDES', 'BOOTS', 'LOAFERS', 'SPORTS');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateTable
CREATE TABLE "Shoes" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "brand" "Brand" NOT NULL,
    "size" INTEGER[],
    "category" "Category" NOT NULL,
    "color" TEXT[],

    CONSTRAINT "Shoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shoes_id_key" ON "Shoes"("id");

-- AddForeignKey
ALTER TABLE "Shoes" ADD CONSTRAINT "Shoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
