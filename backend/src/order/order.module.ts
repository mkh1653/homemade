import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { SpecialtyModule } from 'src/specialty/specialty.module';

@Module({
  imports: [SpecialtyModule, UsersModule, TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
