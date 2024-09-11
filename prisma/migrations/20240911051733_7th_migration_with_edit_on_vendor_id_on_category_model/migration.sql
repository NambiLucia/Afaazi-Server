-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_vendorId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "vendorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
