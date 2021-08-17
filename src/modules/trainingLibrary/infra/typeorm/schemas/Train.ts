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

@Entity('train')
class Train {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  personal_id: string;

  @OneToMany(() => Execution, execution => execution.train)
  execution: Execution[];

  @Column()
  division: string;

  @Column()
  methodology: string;

  @Column()
  series: number;

  @Column()
  repetitions: number;

  @Column()
  comments: string;

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
