/*
  Warnings:

  - Added the required column `renter` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comission` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `locations` ADD COLUMN `renter` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `properties` ADD COLUMN `comission` DOUBLE NOT NULL;
