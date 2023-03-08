/*
  Warnings:

  - Added the required column `category` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedDate` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Book` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `publishedDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `publisher` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `List` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
