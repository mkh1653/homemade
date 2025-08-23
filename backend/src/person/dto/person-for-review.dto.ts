import { Expose } from 'class-transformer';
import { Person } from '../entities/person.entity';

export class PersonForReviewDto {
  constructor(entity: Person) {
    Object.assign(this, entity);
  }

  @Expose()
  publicId: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
