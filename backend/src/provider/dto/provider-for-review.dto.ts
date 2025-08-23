import { Expose, Type } from 'class-transformer';
import { PersonForReviewDto } from 'src/person/dto/person-for-review.dto';

export class ProviderForReviewDto {
  @Expose()
  publicId: string;

  @Type(() => PersonForReviewDto)
  person: PersonForReviewDto;
}
