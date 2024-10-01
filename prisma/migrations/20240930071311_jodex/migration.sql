-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "shoesId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_id_key" ON "Cart"("id");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_shoesId_fkey" FOREIGN KEY ("shoesId") REFERENCES "Shoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
