-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "package" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "vendorId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_title_key" ON "Profile"("title");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
