import { TestingModule, Test } from '@nestjs/testing';
import { PrismaService } from '../db/prisma.service';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';

class BinanceServiceMock {
  getAllSymbols() {
    return [{ symbol: 'ETHBTC' }];
  }
  getSymbolPairTradeData() {
    return [
      {
        time: '1665893703383',
        quoteQty: '0.00085251',
        qty: '0.01270000',
        price: '0.06712700',
        isBuyerMarket: null,
        isBestMatch: true,
      },
      {
        time: '1665893703733',
        quoteQty: '0.08285362',
        qty: '1.23430000',
        price: '0.06712600',
        isBuyerMarket: null,
        isBestMatch: true,
      },
      {
        time: '1665893704489',
        quoteQty: '0.00040946',
        qty: '0.00610000',
        price: '0.06712500',
        isBuyerMarket: null,
        isBestMatch: true,
      },
      {
        time: '1665893707776',
        quoteQty: '0.05213598',
        qty: '0.77670000',
        price: '0.06712500',
        isBuyerMarket: null,
        isBestMatch: true,
      },
      {
        time: '1665893708177',
        quoteQty: '0.02093628',
        qty: '0.31190000',
        price: '0.06712500',
        isBuyerMarket: null,
        isBestMatch: true,
      },
      {
        time: '1665893708479',
        quoteQty: '0.00948476',
        qty: '0.14130000',
        price: '0.06712500',
        isBuyerMarket: null,
        isBestMatch: true,
      },
      {
        time: '1665893727190',
        quoteQty: '0.00821610',
        qty: '0.12240000',
        price: '0.06712500',
        isBuyerMarket: null,
        isBestMatch: true,
      },
      {
        time: '1665893727144',
        quoteQty: '0.01012916',
        qty: '0.15090000',
        price: '0.06712500',
        isBuyerMarket: null,
        isBestMatch: true,
      },
    ];
  }
  getSymbolsWithPageAndPageSize() {
    return '';
  }
}
describe('BinanceController', () => {
  let binanceController: BinanceController;
  let binanceService: BinanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BinanceController],
      providers: [
        {
          provide: BinanceService,
          useClass: BinanceServiceMock,
        },
        PrismaService,
      ],
    }).compile();

    binanceController = module.get<BinanceController>(BinanceController);
    binanceService = module.get<BinanceService>(BinanceService);
  });

  it('should be defined', () => {
    expect(binanceController).toBeDefined();
  });

  describe('getAllSymbols', () => {
    it('should return all symbols', () => {
      const result = [{ symbol: 'ETHBTC' }];
      expect(binanceService.getAllSymbols()).toEqual(result);
    });
  });

  describe('getRecentTrades', () => {
    it('should return all recent trades for the specific symbol pair', () => {
      const result = [
        {
          time: '1665893703383',
          quoteQty: '0.00085251',
          qty: '0.01270000',
          price: '0.06712700',
          isBuyerMarket: null,
          isBestMatch: true,
        },
        {
          time: '1665893703733',
          quoteQty: '0.08285362',
          qty: '1.23430000',
          price: '0.06712600',
          isBuyerMarket: null,
          isBestMatch: true,
        },
        {
          time: '1665893704489',
          quoteQty: '0.00040946',
          qty: '0.00610000',
          price: '0.06712500',
          isBuyerMarket: null,
          isBestMatch: true,
        },
        {
          time: '1665893707776',
          quoteQty: '0.05213598',
          qty: '0.77670000',
          price: '0.06712500',
          isBuyerMarket: null,
          isBestMatch: true,
        },
        {
          time: '1665893708177',
          quoteQty: '0.02093628',
          qty: '0.31190000',
          price: '0.06712500',
          isBuyerMarket: null,
          isBestMatch: true,
        },
        {
          time: '1665893708479',
          quoteQty: '0.00948476',
          qty: '0.14130000',
          price: '0.06712500',
          isBuyerMarket: null,
          isBestMatch: true,
        },
        {
          time: '1665893727190',
          quoteQty: '0.00821610',
          qty: '0.12240000',
          price: '0.06712500',
          isBuyerMarket: null,
          isBestMatch: true,
        },
        {
          time: '1665893727144',
          quoteQty: '0.01012916',
          qty: '0.15090000',
          price: '0.06712500',
          isBuyerMarket: null,
          isBestMatch: true,
        },
      ];
      expect(binanceService.getSymbolPairTradeData('ETHBTC')).toEqual(result);
    });
  });
});
