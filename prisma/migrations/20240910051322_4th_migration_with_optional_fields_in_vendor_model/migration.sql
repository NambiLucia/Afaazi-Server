-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_coupleId_fkey";

-- AlterTable
ALTER TABLE "Vendor" ALTER COLUMN "coupleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE SET NULL ON UPDATE CASCADE;
