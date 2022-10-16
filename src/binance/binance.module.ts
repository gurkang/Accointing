import { CacheModule, Module } from '@nestjs/common';
import { ClientOpts } from 'redis';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';
import * as redisStore from 'cache-manager-redis-store';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../db/prisma.service';

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: process.env.REDIS,
      port: 6379,
    }),
    HttpModule,
  ],
  controllers: [BinanceController],
  providers: [BinanceService, PrismaService],
})
export class BinanceModule {}
