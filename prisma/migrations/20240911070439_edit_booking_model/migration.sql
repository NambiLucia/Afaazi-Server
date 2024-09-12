/*
  Warnings:

  - You are about to drop the column `name` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `additionalInfo` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedBudget` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_coupleId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "name",
ADD COLUMN     "additionalInfo" TEXT NOT NULL,
ADD COLUMN     "checkoutDate" TIMESTAMP(3),
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "estimatedBudget" TEXT NOT NULL,
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL DEFAULT '000-000-0000',
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "coupleId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_username_key" ON "Booking"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_email_key" ON "Booking"("email");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE SET NULL ON UPDATE CASCADE;
