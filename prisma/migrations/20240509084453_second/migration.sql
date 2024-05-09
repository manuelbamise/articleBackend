/*
  Warnings:

  - Added the required column `published` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `published` BOOLEAN NOT NULL;
