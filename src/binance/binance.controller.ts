import { Controller, Get, Query, Put, Res, UseGuards } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { Response } from 'express';
import {
  SymbolPaginatedDataDTO,
  SymbolRecentTradeDTO,
} from './DTO/binance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/symbolPairs')
  async getBinanceData(
    @Query('pageNumber') page: string,
    @Query('pageSize') pageSize: string,
  ): Promise<SymbolPaginatedDataDTO> {
    return await this.binanceService.getSymbolsWithPageAndPageSize(
      parseInt(page),
      parseInt(pageSize),
    );
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/symbolPairs/trades')
  async getRecentTradesForSymbolPair(
    @Query('symbol') symbol: string,
  ): Promise<SymbolRecentTradeDTO[]> {
    return await this.binanceService.getSymbolPairTradeData(symbol);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('/symbolPairs/trades')
  async fetchAndStoreRecentTradesForSymbolPair(
    @Res() response: Response,
    @Query('symbol') symbol: string,
    @Query('trades') trades: number,
  ) {
    await this.binanceService.storeSymbolPairTradeData(symbol, trades);
    response.status(201).send();
  }
}
