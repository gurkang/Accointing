/*
  Warnings:

  - You are about to drop the `Symbol` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecentTradeForSymbol" DROP CONSTRAINT "RecentTradeForSymbol_symbolId_fkey";

-- DropTable
DROP TABLE "Symbol";

-- CreateTable
CREATE TABLE "SymbolPair" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "SymbolPair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SymbolPair_symbol_key" ON "SymbolPair"("symbol");

-- AddForeignKey
ALTER TABLE "RecentTradeForSymbol" ADD CONSTRAINT "RecentTradeForSymbol_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "SymbolPair"("id") ON DELETE SET NULL ON UPDATE CASCADE;
