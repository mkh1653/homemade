import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, FindManyOptions } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(createPersonDto);

    return this.personRepository.save(person);
  }

  async findOne(
    identifier: number | string,
    options?: FindOneOptions<Person>,
  ): Promise<Person> {
    let whereCondition: FindOneOptions<Person>['where'];

    if (typeof identifier === 'number') {
      whereCondition = { id: identifier };
    } else {
      whereCondition = { publicId: identifier };
    }
    const person = await this.personRepository.findOne({
      where: whereCondition,
      ...options,
    });

    if (!person) {
      throw new NotFoundException(`Person with ID ${identifier} not found`);
    }

    return person;
  }

  async findAll(options?: FindManyOptions<Person>): Promise<Person[]> {
    return this.personRepository.find(options);
  }

  async update(
    identifier: number | string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<Person> {
    const person = await this.findOne(identifier);

    Object.assign(person, updatePersonDto);
    return this.personRepository.save(person);
  }

  async remove(identifier: number | string): Promise<Person> {
    const person = await this.findOne(identifier);

    person.isDeleted = true;
    return this.personRepository.save(person);
  }

  async findByPhone(phone: string): Promise<Person> {
    const person = await this.personRepository.findOneBy({ phone });
    if (!person) {
      throw new NotFoundException(`Person with Phone ${phone} not found`);
    }

    return person;
  }
}
