/*
  Warnings:

  - You are about to drop the column `contact` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `cost` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.
  - You are about to alter the column `cost2` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.
  - You are about to alter the column `cost3` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.
  - You are about to alter the column `cost4` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT,
    "type" TEXT,
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
    "code2" TEXT,
    "code3" TEXT,
    "code4" TEXT,
    "qnt" TEXT,
    "qnt2" TEXT,
    "qnt3" TEXT,
    "qnt4" TEXT,
    "size" TEXT,
    "size2" TEXT,
    "size3" TEXT,
    "size4" TEXT,
    "description" TEXT,
    "description2" TEXT,
    "description3" TEXT,
    "description4" TEXT,
    "cost" DECIMAL,
    "cost2" DECIMAL,
    "cost3" DECIMAL,
    "cost4" DECIMAL,
    "discount" DECIMAL,
    "observation" TEXT,
    "total" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Order" ("address", "cep", "city", "code", "code2", "code3", "code4", "corporateName", "cost", "cost2", "cost3", "cost4", "cpfCnpj", "createdAt", "date", "deliveryAddress", "description", "description2", "description3", "description4", "district", "email", "id", "ie", "payment", "phone", "qnt", "qnt2", "qnt3", "qnt4", "size", "size2", "size3", "size4", "state", "total", "type") SELECT "address", "cep", "city", "code", "code2", "code3", "code4", "corporateName", "cost", "cost2", "cost3", "cost4", "cpfCnpj", "createdAt", "date", "deliveryAddress", "description", "description2", "description3", "description4", "district", "email", "id", "ie", "payment", "phone", "qnt", "qnt2", "qnt3", "qnt4", "size", "size2", "size3", "size4", "state", "total", "type" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
