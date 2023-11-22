import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ default: null, nullable: true })
  plan: string;

  @Column({ default: null, nullable: true })
  password: string;
}
