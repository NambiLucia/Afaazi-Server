/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_slug_key" ON "Booking"("slug");
