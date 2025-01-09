/*
  Warnings:

  - Added the required column `questionText` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "questionText" TEXT NOT NULL;
