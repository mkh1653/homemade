import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCityDto {
  @IsString()
  name: string;

  @IsNumber()
  @Type(() => Number)
  provinceId: number;
}
