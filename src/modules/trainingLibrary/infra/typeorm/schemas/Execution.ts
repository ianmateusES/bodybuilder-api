import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exercise } from '@modules/exercises/infra/typeorm/schemas/Exercise';

import { Train } from './Train';

@Entity('execution')
class Execution {
  @ObjectIdColumn()
  id: ObjectID;

  @ManyToOne(() => Train, train => train.execution)
  train: Train;

  @Column()
  exercise_id: string;

  @ManyToMany(() => Exercise)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

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

export { Execution };
