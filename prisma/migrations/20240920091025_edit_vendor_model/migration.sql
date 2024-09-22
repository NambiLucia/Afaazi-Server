/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_vendorId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "vendorId";

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
