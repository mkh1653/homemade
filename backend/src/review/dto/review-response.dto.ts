import { Expose, Type } from 'class-transformer';
import { CustomerForReviewDto } from 'src/customer/dto/customer-for-review.dto';
import { ProviderForReviewDto } from 'src/provider/dto/provider-for-review.dto';
import { OrderForReviewDto } from 'src/order/dto/order-for-review.dto';

export class ReviewResponseDto {
  @Expose()
  publicId: string;

  @Expose()
  rating: number;

  @Expose()
  comment: string;

  @Expose()
  @Type(() => OrderForReviewDto)
  order: OrderForReviewDto;

  @Expose()
  @Type(() => CustomerForReviewDto)
  customer: CustomerForReviewDto;

  @Expose()
  @Type(() => ProviderForReviewDto)
  provider: ProviderForReviewDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose({ name: 'orderPublicId' })
  get orderPublicIdValue(): string {
    return this.order ? this.order.publicId : null;
  }

  @Expose({ name: 'customer' })
  @Type(() => CustomerForReviewDto)
  get getCustomer(): CustomerForReviewDto {
    return this.order && this.order.customer ? this.order.customer : null;
  }

  @Expose({ name: 'provider' })
  @Type(() => ProviderForReviewDto)
  get getProvider(): ProviderForReviewDto {
    return this.order && this.order.selectedProvider
      ? this.order.selectedProvider
      : null;
  }
}
