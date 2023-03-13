/*
  Warnings:

  - The primary key for the `BooksOnLists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BooksOnLists` DROP FOREIGN KEY `BooksOnLists_bookId_fkey`;

-- AlterTable
ALTER TABLE `BooksOnLists` DROP PRIMARY KEY,
    MODIFY `bookId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`listId`);

-- DropTable
DROP TABLE `Book`;
