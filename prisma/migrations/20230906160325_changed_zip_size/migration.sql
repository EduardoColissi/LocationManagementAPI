/*
  Warnings:

  - You are about to alter the column `zip_code` on the `properties` table. The data in that column could be lost. The data in that column will be cast from `VarChar(160)` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE `properties` MODIFY `zip_code` VARCHAR(8) NOT NULL;
