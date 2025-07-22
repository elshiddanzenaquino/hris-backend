/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "createdAt",
ADD COLUMN     "timeIn" TIMESTAMP(3),
ADD COLUMN     "timeOut" TIMESTAMP(3);
