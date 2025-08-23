import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/review.entity';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Rating])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
