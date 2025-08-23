import { Expose, Type } from 'class-transformer';
import { PersonResponseDto } from '../../person/dto/person-response.dto';
import { OrderResponseDto } from '../../order/dto/order-response.dto';

export class CustomerResponseDto {

  @Expose()
  publicId: string;

  @Expose()
  @Type(() => PersonResponseDto)
  person: PersonResponseDto;

  @Expose()
  @Type(() => OrderResponseDto)
  orders: OrderResponseDto[];
}
