import { HttpService } from '@nestjs/axios';
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '../db/prisma.service';
import {
  SymbolPairDTO,
  SymbolPaginatedDataDTO,
  SymbolRecentTradeDTO,
} from './DTO/binance.dto';

@Injectable()
export class BinanceService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {
    this.updateSymbols();
  }

  private async updateSymbols() {
    try {
      const allSymbolsResult = this.httpService.get<SymbolPairDTO[]>(
        'https://www.binance.com/api/v3/ticker/price',
      );
      const res = await lastValueFrom(allSymbolsResult);
      await this.cacheManager.set('all_symbols', res.data, {
        ttl: 3600,
      });
      await this.prisma.symbolPair.createMany({
        data: res.data.map((dt) => {
          return { symbol: dt.symbol };
        }),
        skipDuplicates: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSymbolsWithPageAndPageSize(
    page: number,
    pageSize: number,
  ): Promise<SymbolPaginatedDataDTO> {
    const symbols = await this.prisma.symbolPair.findMany({
      orderBy: { symbol: 'desc' },
      skip: page * pageSize,
      take: pageSize,
      select: {
        symbol: true,
      },
    });
    return {
      symbols,
      meta: {
        page: page,
        pageSize: pageSize,
        totalItems: await this.prisma.symbolPair.count(),
      },
    };
  }

  async getAllSymbols(): Promise<SymbolPairDTO[]> {
    const cachedData = await this.cacheManager.get<SymbolPairDTO[]>(
      'all_symbols',
    );
    if (cachedData !== undefined && cachedData !== null) {
      return cachedData;
    }
    return this.updateSymbols();
  }

  async getSymbolPairTradeData(
    symbol: string,
  ): Promise<SymbolRecentTradeDTO[]> {
    const cachedData = await this.cacheManager.get<SymbolRecentTradeDTO[]>(
      `${symbol}$`,
    );
    if (cachedData !== undefined && cachedData !== null) {
      return cachedData;
    }
    const data = (await this.prisma.recentTradeForSymbol.findMany({
      where: {
        symbol: {
          symbol: symbol,
        },
      },
      select: {
        time: true,
        quoteQty: true,
        qty: true,
        price: true,
        isBuyerMarket: true,
        isBestMatch: true,
      },
    })) as SymbolRecentTradeDTO[];
    return data;
  }

  async storeSymbolPairTradeData(
    symbol: string,
    numberOfTrades?: number,
  ): Promise<SymbolRecentTradeDTO[]> {
    try {
      const cachedData = await this.cacheManager.get<SymbolRecentTradeDTO[]>(
        `${symbol}${numberOfTrades}`,
      );
      if (cachedData !== undefined && cachedData !== null) {
        return cachedData;
      }
      const recentTradesForTicker = this.httpService.get<
        SymbolRecentTradeDTO[]
      >(
        `https://www.binance.com/api/v3/trades?symbol=${symbol}&limit=${
          numberOfTrades || 500
        }`,
      );
      const result = await lastValueFrom(recentTradesForTicker);
      await this.prisma.recentTradeForSymbol.deleteMany({
        where: {
          symbol: {
            symbol: symbol,
          },
        },
      });
      result.data.map(async (sym) => {
        await this.prisma.recentTradeForSymbol.create({
          data: {
            symbol: {
              connect: {
                symbol: symbol,
              },
            },
            isBestMatch: sym.isBestMatch,
            isBuyerMarket: sym.isBuyerMarket,
            quoteQty: sym.quoteQty,
            time: String(sym.time),
            price: sym.price,
            qty: sym.qty,
          },
        });
      });
      const mappedData = result.data;
      await this.cacheManager.set(`${symbol}${numberOfTrades}`, mappedData, {
        ttl: 30,
      });
      return mappedData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
