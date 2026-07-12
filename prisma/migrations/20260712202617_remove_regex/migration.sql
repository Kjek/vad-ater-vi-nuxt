/*
  Warnings:

  - You are about to drop the column `lunchRegex` on the `restaurant_config` table. All the data in the column will be lost.
  - You are about to drop the column `weeklyRegex` on the `restaurant_config` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "restaurant_config" DROP COLUMN "lunchRegex",
DROP COLUMN "weeklyRegex";
