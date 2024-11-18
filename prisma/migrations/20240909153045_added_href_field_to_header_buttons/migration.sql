/*
  Warnings:

  - Added the required column `href` to the `HeaderButtons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HeaderButtons" ADD COLUMN     "href" TEXT NOT NULL;
