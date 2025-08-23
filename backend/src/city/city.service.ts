import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const newCity = this.cityRepository.create(createCityDto);

    return this.cityRepository.save(newCity);
  }

  async findAll(): Promise<City[]> {
    return this.cityRepository.find();
  }

  async findOne(identifier: number | string): Promise<City> {
    let whereCondition: FindOneOptions<City>['where'];

    if (typeof identifier === 'string') {
      whereCondition = { publicId: identifier };
    } else {
      whereCondition = { id: identifier };
    }

    const city = await this.cityRepository.findOneBy(whereCondition);

    if (!city) {
      throw new NotFoundException(`City with ID ${identifier} Not Found`);
    }
    return city;
  }

  async update(identifier: number | string, updateCityDto: UpdateCityDto): Promise<City> {
    const city = await this.findOne(identifier);

    Object.assign(city, updateCityDto);
    return this.cityRepository.save(city);
  }

  async remove(identifier: number | string): Promise<void> {
    const city = await this.findOne(identifier);
    await this.cityRepository.delete(city);
  }
}
