import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Person } from 'src/person/entities/person.entity';

@Entity()
export class Supporter {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Person, (person) => person.supporters)
  person: Person;
}
