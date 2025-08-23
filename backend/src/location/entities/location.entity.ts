import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Province } from 'src/province/entities/province.entity';
import { City } from 'src/city/entities/city.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  lat: string;

  @Column()
  long: string;

  @Column()
  address: string;

  @OneToOne(() => Province)
  @JoinColumn()
  province: Province;

  @OneToOne(() => City)
  @JoinColumn()
  city: Province;
}
