import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { BinanceModule } from './binance/binance.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 10,
    }),
    BinanceModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
