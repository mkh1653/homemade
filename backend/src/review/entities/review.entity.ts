import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Review {
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

  @Column({ type: 'int', nullable: false, default: 0 })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @OneToOne(() => Order, (order) => order.review, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: Order;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
