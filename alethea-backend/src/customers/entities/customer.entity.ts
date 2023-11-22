import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  avatar: string;

  @Column({ nullable: true, default: null })
  city: string;

  @Column({ nullable: true, default: null })
  currency: string;

  @Column({ nullable: true, default: null })
  country: string;

  @Column({ nullable: true, default: null, unique: true })
  email: string;

  @Column({ nullable: true, default: false })
  hasAcceptedMarketing: boolean;

  @Column({ nullable: true, default: false })
  isProspect: boolean;

  @Column({ nullable: true, default: false })
  isReturning: boolean;

  @Column({ nullable: true, default: null })
  name: string;

  @Column({ nullable: true, default: null })
  state: string;

  @Column({ default: 0 })
  totalAmountSpent: number;

  @Column({ default: 0 })
  totalOrders: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
