import { Module } from '@nestjs/common';
import { ProviderSpecialtyService } from './provider-specialty.service';
import { ProviderSpecialtyController } from './provider-specialty.controller';
import { SpecialtyModule } from 'src/specialty/specialty.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderSpecialty } from './entities/provider-specialty.entity';

@Module({
  imports: [
    UsersModule,
    SpecialtyModule,
    TypeOrmModule.forFeature([ProviderSpecialty]),
  ],
  providers: [ProviderSpecialtyService],
  controllers: [ProviderSpecialtyController],
  exports: [ProviderSpecialtyService],
})
export class ProviderSpecialtyModule {}
