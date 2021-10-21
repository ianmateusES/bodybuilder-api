import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
  OneToMany,
} from 'typeorm';

import { Execution } from './Execution';

@Entity('trains')
class Train {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  personal_id: string;

  @OneToMany(() => Execution, execution => execution)
  execution: Execution[];

  @Column()
  objective: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // constructor() {
  //   if (!this.id) {
  //     this.id = new ObjectID();
  //   }
  // }
}

export { Train };
