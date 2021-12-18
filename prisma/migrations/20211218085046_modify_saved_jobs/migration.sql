/*
  Warnings:

  - You are about to drop the column `saved_posts` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "saved_posts",
ADD COLUMN     "saved_jobs" INTEGER[];
