import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/common/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { City } from './entities/city.entity';
import { CityResponseDto } from './dto/city-response.dto';

@Controller('city')
@UseGuards(RolesGuard, AuthGuard)
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.SUPPORT)
  async create(@Body() createCityDto: CreateCityDto): Promise<CityResponseDto> {
    return await this.cityService.create(createCityDto);
  }

  @Get()
  @Roles(UserRole.SUPPORT, UserRole.CUSTOMER, UserRole.PROVIDER)
  async findAll(): Promise<CityResponseDto[]> {
    return await this.cityService.findAll();
  }

  @Get(':publicId')
  @Roles(UserRole.SUPPORT, UserRole.CUSTOMER, UserRole.PROVIDER)
  async findOne(
    @Param('publicId', ParseUUIDPipe) publicId: string,
  ): Promise<CityResponseDto> {
    return await this.cityService.findOne(publicId);
  }

  @Patch(':publicId')
  @Roles(UserRole.SUPPORT)
  async update(
    @Param('publicId', ParseUUIDPipe) publicId: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<CityResponseDto> {
    return await this.cityService.update(publicId, updateCityDto);
  }

  @Delete(':publicId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.SUPPORT)
  async remove(
    @Param('publicId', ParseUUIDPipe) publicId: string,
  ): Promise<void> {
    return await this.cityService.remove(publicId);
  }
}
