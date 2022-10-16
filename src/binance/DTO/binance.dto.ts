export class SymbolPairDTO {
  symbol: string;
}

export class SymbolPaginatedDataDTO {
  symbols: SymbolPairDTO[];
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
  };
}

export class SymbolRecentTradeDTO {
  price: string;
  qty: string;
  quoteQty: string;
  time: string;
  isBuyerMarket: boolean;
  isBestMatch: boolean;
  symbol: string;
}

export class FetchAndStoreRecentTradesForSymbolPairDTO {
  symbol: string;
  numberOfTrades: number;
}
