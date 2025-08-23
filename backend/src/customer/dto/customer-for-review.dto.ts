import { Expose, Type } from 'class-transformer';
import { Customer } from '../entities/customer.entity';
import { PersonForReviewDto } from 'src/person/dto/person-for-review.dto';

export class CustomerForReviewDto {
  constructor(entity: Customer) {
    Object.assign(this, entity);
    if (entity.person) {
      this.person = new PersonForReviewDto(entity.person);
    }
  }

  @Expose()
  publicId: string;

  @Type(() => PersonForReviewDto)
  person: PersonForReviewDto;
}
