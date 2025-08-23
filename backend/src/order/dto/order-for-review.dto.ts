import { Expose, Type } from 'class-transformer';
import { Order } from '../entities/order.entity';
import { OrderStatus } from 'src/common/enums/order-status.entity';
import { CustomerForReviewDto } from 'src/customer/dto/customer-for-review.dto';
import { ProviderForReviewDto } from 'src/provider/dto/provider-for-review.dto';

export class OrderForReviewDto {
  constructor(entity: Order) {
    Object.assign(this, entity);

    if (entity.customer) {
      this.customer = new CustomerForReviewDto(entity.customer);
    }

    if (entity.selectedProvider) {
      this.selectedProvider = new ProviderForReviewDto(entity.selectedProvider);
    }
  }
  
  @Expose()
  publicId: string;

  @Expose()
  status: OrderStatus;

  @Expose()
  price: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => CustomerForReviewDto)
  customer: CustomerForReviewDto;

  @Expose()
  @Type(() => ProviderForReviewDto)
  selectedProvider?: ProviderForReviewDto;
}
