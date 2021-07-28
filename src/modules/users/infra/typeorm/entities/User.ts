import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Address } from './Address';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  birthday: Date;

  @Column()
  telephone: string;

  @Column()
  user_type: string;

  @Column()
  professional_info_id: string;

  @Column()
  address_id: string;

  @OneToOne(() => Address, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'age' })
  getAge(): number {
    const now = new Date();
    const age = now.getFullYear() - this.birthday.getFullYear();

    return age;
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
