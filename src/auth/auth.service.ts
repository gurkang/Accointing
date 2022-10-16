import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserInputDTO } from './DTO/ValidateUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateClient(user: ValidateUserInputDTO): Promise<any> {
    if (user.username !== 'accointing' && user.password !== 'accointing') {
      throw new UnauthorizedException('wrong credentials');
    }
    return {
      clientId: 'accointing',
    };
  }

  async login(user: ValidateUserInputDTO) {
    const client = this.validateClient(user);
    return {
      access_token: this.jwtService.sign({ ...client }),
    };
  }
}
