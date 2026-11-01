/*
  Warnings:

  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."item";

-- CreateTable
CREATE TABLE "ShoppingItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingItem_pkey" PRIMARY KEY ("id")
);
