/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vendor_username_key" ON "Vendor"("username");
