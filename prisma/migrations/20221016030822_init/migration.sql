/*
  Warnings:

  - Made the column `symbolId` on table `RecentTradeForSymbol` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RecentTradeForSymbol" DROP CONSTRAINT "RecentTradeForSymbol_symbolId_fkey";

-- AlterTable
ALTER TABLE "RecentTradeForSymbol" ALTER COLUMN "symbolId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "RecentTradeForSymbol" ADD CONSTRAINT "RecentTradeForSymbol_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "SymbolPair"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
