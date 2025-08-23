import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}
