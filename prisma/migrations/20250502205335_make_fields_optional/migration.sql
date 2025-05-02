/*
  Warnings:

  - You are about to drop the column `cpf_cnpj` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_address` on the `Order` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT,
    "type" TEXT,
    "contact" TEXT,
    "corporateName" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "cep" TEXT,
    "cpfCnpj" TEXT,
    "ie" TEXT,
    "district" TEXT,
    "payment" TEXT,
    "email" TEXT,
    "deliveryAddress" TEXT,
    "code" TEXT,
    "qnt" TEXT,
    "size" TEXT,
    "description" TEXT,
    "cost" TEXT,
    "total" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Order" ("address", "cep", "city", "code", "contact", "corporateName", "cost", "createdAt", "date", "description", "district", "email", "id", "ie", "payment", "phone", "qnt", "size", "state", "total", "type") SELECT "address", "cep", "city", "code", "contact", "corporateName", "cost", "createdAt", "date", "description", "district", "email", "id", "ie", "payment", "phone", "qnt", "size", "state", "total", "type" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
