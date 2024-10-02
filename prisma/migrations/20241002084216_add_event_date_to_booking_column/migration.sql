/*
  Warnings:

  - Added the required column `eventDate` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL;
