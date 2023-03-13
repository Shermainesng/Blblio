/*
  Warnings:

  - You are about to drop the column `listId` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_listId_fkey`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `listId`;

-- CreateTable
CREATE TABLE `BooksOnLists` (
    `bookId` INTEGER NOT NULL,
    `listId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`bookId`, `listId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BooksOnLists` ADD CONSTRAINT `BooksOnLists_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BooksOnLists` ADD CONSTRAINT `BooksOnLists_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
