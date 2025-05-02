/*
  Warnings:

  - Made the column `address` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cep` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `corporateName` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cost` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpfCnpj` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deliveryAddress` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `district` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ie` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `payment` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `qnt` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "corporateName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "ie" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "payment" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "qnt" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Order" ("address", "cep", "city", "code", "contact", "corporateName", "cost", "cpfCnpj", "createdAt", "date", "deliveryAddress", "description", "district", "email", "id", "ie", "payment", "phone", "qnt", "size", "state", "total", "type") SELECT "address", "cep", "city", "code", "contact", "corporateName", "cost", "cpfCnpj", "createdAt", "date", "deliveryAddress", "description", "district", "email", "id", "ie", "payment", "phone", "qnt", "size", "state", "total", "type" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
