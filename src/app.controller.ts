import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ValidateUserInputDTO } from './auth/DTO/ValidateUser.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: ValidateUserInputDTO) {
    return this.authService.login(user);
  }
}
