/*
  Warnings:

  - You are about to drop the column `screenName` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_screenName_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "screenName";
