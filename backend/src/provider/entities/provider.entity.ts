import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';

import { Person } from 'src/person/entities/person.entity';
import { ProviderSpecialty } from 'src/provider-specialty/entities/provider-specialty.entity';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import { Order } from 'src/order/entities/order.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false,
    default: () => 'gen_random_uuid()',
  })
  @Index({ unique: true })
  publicId: string;

  @Column({ nullable: true })
  bio?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Person, (person) => person.providers)
  person: Person;

  @OneToMany(() => ProviderSpecialty, (ps) => ps.provider)
  providerSpecialties: ProviderSpecialty[];

  @OneToMany(() => Proposal, (proposal) => proposal.provider)
  proposals: Proposal[];

  @OneToMany(() => Order, (order) => order.selectedProvider)
  selectedOrders: Order[];

  @Expose()
  get fullName(): string {
    return this.person
      ? `${this.person.firstName || ''} ${this.person.lastName || ''}`.trim()
      : null;
  }
}
