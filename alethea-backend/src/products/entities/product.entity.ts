import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  attributes: string;

  @Column({ nullable: true, default: null })
  category: string;

  @Column({ nullable: true, default: null })
  currency: string;

  @Column({ nullable: true, default: null })
  image: string;

  @Column({ nullable: true, default: null })
  inventoryType: string;

  @Column({ nullable: true, default: false })
  isAvailable: boolean;

  @Column({ nullable: true, default: false })
  isShippable: boolean;

  @Column({ nullable: true, default: null })
  name: string;

  @Column({ nullable: true, default: null })
  price: string;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  variants: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
