-- CreateTable
CREATE TABLE "Symbol" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "Symbol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecentTradeForSymbol" (
    "id" SERIAL NOT NULL,
    "price" TEXT NOT NULL,
    "qty" TEXT NOT NULL,
    "quoteQty" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "isBuyerMarket" BOOLEAN NOT NULL,
    "isBestMatch" BOOLEAN NOT NULL,
    "symbolId" INTEGER,

    CONSTRAINT "RecentTradeForSymbol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Symbol_symbol_key" ON "Symbol"("symbol");

-- AddForeignKey
ALTER TABLE "RecentTradeForSymbol" ADD CONSTRAINT "RecentTradeForSymbol_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "Symbol"("id") ON DELETE SET NULL ON UPDATE CASCADE;
