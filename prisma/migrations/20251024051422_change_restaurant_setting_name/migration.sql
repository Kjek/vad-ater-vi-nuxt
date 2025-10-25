/*
  Warnings:

  - You are about to drop the `restaurant_setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."restaurant_setting" DROP CONSTRAINT "restaurant_setting_restaurantId_fkey";

-- DropTable
DROP TABLE "public"."restaurant_setting";

-- CreateTable
CREATE TABLE "restaurant_config" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "homeUrl" TEXT NOT NULL,
    "lunchUrl" TEXT NOT NULL,
    "lunchRegex" TEXT,
    "weeklyRegex" TEXT,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "restaurant_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_config_name_key" ON "restaurant_config"("name");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_config_restaurantId_key" ON "restaurant_config"("restaurantId");

-- AddForeignKey
ALTER TABLE "restaurant_config" ADD CONSTRAINT "restaurant_config_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
