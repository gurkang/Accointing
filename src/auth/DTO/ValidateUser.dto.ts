import { IsNotEmpty } from 'class-validator';

export class ValidateUserInputDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export class ValidateUserReturnDTO {
  clientId: string;
}
