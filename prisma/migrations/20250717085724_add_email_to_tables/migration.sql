/*
  Warnings:

  - Added the required column `email` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Leave" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payroll" ADD COLUMN     "email" TEXT NOT NULL;
