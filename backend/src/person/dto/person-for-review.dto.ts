import { Expose } from 'class-transformer';
import { Person } from '../entities/person.entity';

export class PersonForReviewDto {
  @Expose()
  publicId: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
