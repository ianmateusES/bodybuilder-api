import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('personals')
class Personal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cref: string;

  @Column()
  user_id: string;

  @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE', primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Personal };
